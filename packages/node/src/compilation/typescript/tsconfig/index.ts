import { Project, Tsconfig } from "~/common";

import { getTsconfigPath, loadTsconfig, parseTsconfig } from "./parse";
import { validateCompilerOptions } from "./validate";

export const getTsconfig = async (
	project: Project,
	overrideOutDir?: string
): Promise<Tsconfig> => {
	const path = getTsconfigPath(project);

	if (!path) {
		throw new Error("Tsconfig was not found.");
	}

	const config = loadTsconfig(path);
	const { options, fileNames, errors } = parseTsconfig(config, project);
	const tsconfig: Tsconfig = { options, fileNames, errors, path };

	tsconfig.options = await validateCompilerOptions(
		tsconfig,
		project,
		overrideOutDir
	);

	return tsconfig;
};

export * from "./parse";
export * from "./validate";
export * from "./root-dir";
