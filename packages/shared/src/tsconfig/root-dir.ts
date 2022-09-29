import path from "path";

import {
	isParent,
	BaseProject,
	Tsconfig,
	RootDirOutsideProjectError,
	RootDirRequiredError,
} from "..";

export const commonPart = (path1: string, path2: string): string => {
	let common = "";

	path1.split("").find((char, i) => {
		if (path2[i] === char) {
			common += char;
			return;
		}

		return true;
	});

	return common;
};

export const getCodeDir = async (
	fileNames: string[]
): Promise<string | undefined> => {
	if (!fileNames.length) {
		return;
	}

	return path.resolve(
		fileNames.reduce((previous: string, current: string) =>
			commonPart(previous, current)
		)
	);
};

export const getRootDir = async (
	tsconfig: Tsconfig,
	project: BaseProject
): Promise<string> => {
	const rootDirSet = Boolean(tsconfig.options.rootDir);

	const rootDirInsideProject = rootDirSet
		? isParent(project.path, tsconfig.options.rootDir as string)
		: true;

	if (!rootDirSet || !rootDirInsideProject) {
		const codeDir = await getCodeDir(tsconfig.fileNames);

		if (!rootDirInsideProject) {
			if (!codeDir) {
				throw new RootDirOutsideProjectError(project.name);
			}

			new RootDirOutsideProjectError(project.name, codeDir).warn();

			return codeDir;
		}

		if (!codeDir) {
			throw new RootDirRequiredError(project.name);
		}

		new RootDirRequiredError(project.name, codeDir).warn();

		return codeDir;
	}

	return tsconfig.options.rootDir as string;
};
