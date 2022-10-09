import ts from "typescript";

import {
	isParent,
	BaseProject,
	Tsconfig,
	OutFileNotSupportedError,
	OutDirRequiredError,
	BaseDirOutsideProjectError,
} from "..";

import { getRootDir } from "./root-dir";

type OutDirArgs = {
	important?: boolean;
	override?: string;
};

type Args = {
	tsconfig: Tsconfig;
	project: BaseProject;
	outDir?: OutDirArgs;
};

export const validateCompilerOptions = ({
	tsconfig,
	project,
	outDir = {},
}: Args): ts.CompilerOptions => {
	const newOptions = { ...tsconfig.options };

	if (outDir.important) {
		if (outDir.override) {
			newOptions.outDir = outDir.override;
			newOptions.outFile = undefined;
		}

		if (newOptions.outDir) {
			newOptions.outFile = undefined;
		} else if (newOptions.outFile) {
			throw new OutFileNotSupportedError(project.name);
		} else {
			throw new OutDirRequiredError(project.name);
		}
	}

	if (newOptions.baseUrl && !isParent(project.path, newOptions.baseUrl)) {
		throw new BaseDirOutsideProjectError(project.name);
	}

	newOptions.rootDir = getRootDir(tsconfig, project);

	return newOptions;
};
