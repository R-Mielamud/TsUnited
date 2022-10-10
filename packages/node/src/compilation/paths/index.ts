import fsSync from "fs";
import fs from "fs/promises";
import path from "path";
import { createMatchPath, MatchPath } from "tsconfig-paths";

import { Config, convertForwardSlashes, isParent, Tsconfig } from "~/common";
import { replacePaths } from "./import-regex";
import { traverseOut } from "./traverse";

export const replaceOutPaths = (
	{ options: { baseUrl, paths }, path: tsconfigPath }: Tsconfig,
	config: Config
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

		const relativePath = convertForwardSlashes(
			path.relative(fileDir, resolved)
		);

		return /^\.\.?\//.test(relativePath) || path.isAbsolute(relativePath)
			? relativePath
			: "./" + relativePath;
	});

	await fs.writeFile(file, newContent);
};

export const replaceAliases = async (config: Config): Promise<void> => {
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
					[config.unitedFolder as string]
				);

				const outPaths = replaceOutPaths(tsconfig, config);
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
