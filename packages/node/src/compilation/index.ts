import path from "path";

import { getConfig, getTsconfig } from "~/common";
import { replaceAliases } from "./paths";

import { compileProject } from "./typescript";

export const compile = () => {
	const config = getConfig();
	config.rootProject.tsconfig = getTsconfig(config.rootProject);

	compileProject(config.rootProject);

	const relatedOutBase = path.resolve(
		config.rootProject.tsconfig.options.outDir as string,
		config.unitedFolder as string
	);

	for (const project of config.relatedProjects) {
		const outDir = path.resolve(relatedOutBase, project.name);
		project.tsconfig = getTsconfig(project, true, outDir);

		compileProject(project);
	}

	replaceAliases(config);
};

export * from "./typescript";
export * from "./paths";
