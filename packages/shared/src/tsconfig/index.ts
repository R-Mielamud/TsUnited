import { BaseProject, Tsconfig, TsconfigNotFoundError } from "..";

import { getTsconfigPath, loadTsconfig, parseTsconfig } from "./parse";
import { validateCompilerOptions } from "./validate";

export const getTsconfig = (
	project: BaseProject,
	outDirImportant: boolean = true,
	overrideOutDir?: string
): Tsconfig => {
	const path = getTsconfigPath(project);

	if (!path) {
		throw new TsconfigNotFoundError(project.name);
	}

	const config = loadTsconfig(path);
	const { options, fileNames, errors } = parseTsconfig(config, project);
	const tsconfig: Tsconfig = { options, fileNames, errors, path };

	tsconfig.options = validateCompilerOptions({
		tsconfig,
		project,
		outDir: {
			important: outDirImportant,
			override: overrideOutDir,
		},
	});

	return tsconfig;
};

export * from "./parse";
export * from "./validate";
export * from "./root-dir";
