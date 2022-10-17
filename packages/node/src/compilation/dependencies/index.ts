import fs from "fs/promises";

import { Config, forceGetPackageJsonOfProject, PackageJson } from "~/common";
import { mergeDependencies } from "./merge";

export const mergeAllDependencies = async (
	config: Config
): Promise<PackageJson> => {
	return [config.rootProject, ...config.relatedProjects]
		.map(forceGetPackageJsonOfProject)
		.reduce(async (packageJson1, packageJson2) =>
			mergeDependencies(await packageJson1, await packageJson2)
		);
};

export const mergeAndWritePackageJson = async (
	config: Config,
	writeTo: string
): Promise<void> => {
	const mergedPackageJson = await mergeAllDependencies(config);

	await fs.writeFile(
		writeTo,
		JSON.stringify(mergedPackageJson, null, 2) + "\n"
	);
};

export * from "./merge";
