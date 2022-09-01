import path from "path";

import { DEFAULT_UNITED_FOLDER, getConfig } from "~/common";
import { replaceAliases } from "./paths";

import { compileProject, getTsconfig } from "./typescript";

export const compile = async (): Promise<void> => {
	const config = getConfig();
	config.rootProject.tsconfig = await getTsconfig(config.rootProject);

	compileProject(config.rootProject);

	const relatedOutBase = path.resolve(
		config.rootProject.tsconfig.options.outDir as string,
		config.unitedFolder ?? DEFAULT_UNITED_FOLDER
	);

	for (const project of config.relatedProjects) {
		const outDir = path.resolve(relatedOutBase, project.name);
		project.tsconfig = await getTsconfig(project, outDir);

		compileProject(project);
	}

	replaceAliases(config);
};

export * from "./typescript";
export * from "./paths";

compile();
