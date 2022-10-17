import fsSync from "fs";
import fs from "fs/promises";
import path from "path";

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

export const getParentPaths = (baseDir: string): string[] => {
	const paths: string[] = [];

	let currentPath = baseDir;
	let nextPath: string;

	while (currentPath !== (nextPath = path.resolve(currentPath, "../"))) {
		paths.push(currentPath);
		currentPath = nextPath;
	}

	return paths;
};

export const findFileInParentPaths = (
	baseDir: string,
	possibleNames: string[]
): string | undefined => {
	const parentPaths = getParentPaths(baseDir);

	for (const parentPath of parentPaths) {
		for (const name of possibleNames) {
			const fullPossiblePath = path.resolve(parentPath, name);

			if (fsSync.existsSync(fullPossiblePath)) {
				return fullPossiblePath;
			}
		}
	}
};

export const convertForwardSlashes = (path: string) => {
	return path.replace(/\\/g, "/");
};

export const toRequirePath = (sysPath: string) => {
	const forwardSlashes = convertForwardSlashes(sysPath);

	const isCompletePath =
		/^\.{1,2}\//.test(forwardSlashes) || path.isAbsolute(forwardSlashes);

	return isCompletePath ? forwardSlashes : "./" + forwardSlashes;
};

export const isParent = (parent: string, child: string): boolean => {
	const relative = path.relative(parent, child);

	return Boolean(
		!/^\.\.(\/|\\)/.test(relative) && !path.isAbsolute(relative)
	);
};
