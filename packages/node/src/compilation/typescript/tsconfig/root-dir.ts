import path from "path";
import { isParent, Project, Tsconfig } from "~/common";
import { ValidationError } from "~/common/exceptions";

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
	project: Project
): Promise<string> => {
	const rootDirSet = Boolean(tsconfig.options.rootDir);

	const rootDirInsideProject = rootDirSet
		? isParent(project.path, tsconfig.options.rootDir as string)
		: true;

	if (!rootDirSet || !rootDirInsideProject) {
		const codeDir = await getCodeDir(tsconfig.fileNames);

		if (!rootDirInsideProject) {
			if (!codeDir) {
				throw new ValidationError(
					`compilerOptions.rootDir in ${project.name}'s tsconfig is set to directory outside the project's directory. Also, none of your project's folders contain code, so it's impossible to detemrine rootDir automatically. Please add some code or set rootDir manually in tsconfig.`
				);
			}

			console.warn(
				`compilerOptions.rootDir in ${project.name}'s tsconfig is set to directory outside the project's directory. It will be overwriten and set to ${codeDir}.`
			);

			return codeDir;
		}

		if (!codeDir) {
			throw new ValidationError(
				`compilerOptions.rootDir in ${project.name}'s tsconfig is not set. Also, none of your project's folders contain code, so it's impossible to determine rootDir automatically. Please add some code or set rootDir manually in tsconfig.`
			);
		}

		console.warn(
			`compilerOptions.rootDir in ${project.name} tsconfig is not set. It will be set to ${codeDir}.`
		);

		return codeDir;
	}

	return tsconfig.options.rootDir as string;
};
