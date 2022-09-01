import fs from "fs/promises";
import path from "path";

import { isParent } from "~/common";

export const traverseDir = async (
	dir: string,
	exclude?: string[]
): Promise<string[]> => {
	const paths: string[] = [];
	const items = await fs.readdir(dir, { withFileTypes: true });

	await Promise.all(
		items.map(async (file) => {
			if (exclude && exclude.includes(file.name)) {
				return;
			}

			const itemPath = path.resolve(dir, file.name);

			if (file.isFile()) {
				paths.push(itemPath);
			}

			if (file.isDirectory()) {
				paths.push(...(await traverseDir(itemPath)));
			}
		})
	);

	return paths;
};

export const traverseOut = async (
	outDir: string,
	declarationDir?: string,
	exclude?: string[]
): Promise<string[]> => {
	if (declarationDir && isParent(outDir, declarationDir)) {
		declarationDir = undefined;
	}

	if (declarationDir) {
		const [outFiles, declarationFiles] = await Promise.all([
			traverseDir(outDir, exclude),
			traverseDir(declarationDir, exclude),
		]);

		return [...outFiles, ...declarationFiles];
	}

	return traverseDir(outDir, exclude);
};
