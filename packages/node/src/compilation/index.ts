import path from "path";

import {
	CompileOptions,
	getConfig,
	getTsconfig,
	PACKAGE_JSON_FILE_NAME,
} from "~/common";

import { mergeAndWritePackageJson } from "./dependencies";
import { replaceAliases } from "./paths";
import { compileProject } from "./typescript";

export const compile = async ({ noMergedPackageJson }: CompileOptions = {}) => {
	const config = getConfig();
	config.rootProject.tsconfig = getTsconfig(config.rootProject);

	const rootOut = config.rootProject.tsconfig.options.outDir as string;
	const mergedPackageJsonPath = path.resolve(rootOut, PACKAGE_JSON_FILE_NAME);
	const relatedOutBase = path.resolve(rootOut, config.unitedFolder as string);

	compileProject(config.rootProject);

	config.relatedProjects.forEach((project) => {
		const outDir = path.resolve(relatedOutBase, project.name);
		project.tsconfig = getTsconfig(project, true, outDir);

		compileProject(project);
	});

	console.log("\nReplacing path aliases");

	replaceAliases(config);

	if (!noMergedPackageJson) {
		console.log("\nGenerating merged package.json");

		mergeAndWritePackageJson(config, mergedPackageJsonPath);
	}
};

export * from "./dependencies";
export * from "./typescript";
export * from "./paths";
