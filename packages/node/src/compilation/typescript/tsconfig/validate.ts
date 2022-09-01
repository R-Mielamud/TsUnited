import ts from "typescript";

import { Project, Tsconfig } from "~/common";
import { ValidationError } from "~/common/exceptions";
import { getRootDir } from "./root-dir";

export const validateCompilerOptions = async (
	tsconfig: Tsconfig,
	project: Project,
	overrideOutDir?: string
): Promise<ts.CompilerOptions> => {
	const newOptions = { ...tsconfig.options };

	if (overrideOutDir) {
		newOptions.outDir = overrideOutDir;
		newOptions.outFile = undefined;
	}

	if (newOptions.outDir) {
		newOptions.outFile = undefined;
	} else if (newOptions.outFile) {
		throw new ValidationError(
			`compilerOptions.outFile in tsconfig is currently not supported (set in ${project.name}). Please use compilerOptions.outDir`
		);
	} else {
		throw new ValidationError(
			`compilerOptions.outDir in ${project.name}'s tsconfig is required`
		);
	}

	newOptions.rootDir = await getRootDir(tsconfig, project);
	return newOptions;
};
