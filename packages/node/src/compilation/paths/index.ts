import fsSync from "fs";
import fs from "fs/promises";
import path from "path";
import { createMatchPath, MatchPath } from "tsconfig-paths";

import {
	ConfigWithTsconfigsInProjects,
	toRequirePath,
	isParent,
	Tsconfig,
} from "~/common";

import { replacePaths } from "./import-regex";
import { traverseOut } from "./traverse";

export const replaceRootWithOutPaths = (
	{ options: { baseUrl, paths }, path: tsconfigPath }: Tsconfig,
	config: ConfigWithTsconfigsInProjects
) => {
	return Object.fromEntries(
		Object.entries(paths ?? {}).map(([name, aliases]) => {
			return [
				name,
				aliases.map((alias) => {
					const absoluteAlias = path.resolve(
						baseUrl ?? tsconfigPath,
						alias
					);

					for (const project of [
						config.rootProject,
						...config.relatedProjects,
					]) {
						if (isParent(project.path, absoluteAlias)) {
							return absoluteAlias.replace(
								project.tsconfig.options.rootDir as string,
								project.tsconfig.options.outDir as string
							);
						}
					}

					return alias;
				}),
			];
		})
	);
};

export const replaceInFile = async (file: string, resolver: MatchPath) => {
	const fileDir = path.dirname(file);
	const content = (await fs.readFile(file)).toString();

	const newContent = replacePaths(content, (importString: string) => {
		const resolved = resolver(importString, undefined, fsSync.existsSync);

		if (!resolved) {
			return importString;
		}

		return toRequirePath(path.relative(fileDir, resolved));
	});

	await fs.writeFile(file, newContent);
};

export const replaceAliases = async (
	config: ConfigWithTsconfigsInProjects
): Promise<void> => {
	await Promise.all(
		[...config.relatedProjects, config.rootProject].map(
			async ({ tsconfig }) => {
				const {
					options: { outDir, declarationDir, baseUrl },
				} = tsconfig;

				if (!baseUrl) {
					return;
				}

				const files = await traverseOut(
					outDir as string,
					declarationDir,
					[config.unitedFolder]
				);

				const outPaths = replaceRootWithOutPaths(tsconfig, config);
				const resolver = createMatchPath(baseUrl, outPaths);

				for (const file of files.reverse()) {
					await replaceInFile(file, resolver);
				}
			}
		)
	);
};

export * from "./traverse";
export * from "./import-regex";
