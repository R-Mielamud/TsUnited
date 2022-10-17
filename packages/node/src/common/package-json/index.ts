import fs from "fs/promises";

import { PackageJsonCorruptError, PackageJsonNotFoundError } from "../shared";
import { PackageJson, Project } from "../types";
import { findPackageJsonOfProject } from "./find";

export const getPackageJsonOfProject = async (
	project: Project
): Promise<PackageJson | undefined> => {
	const filePath = findPackageJsonOfProject(project);

	if (!filePath) {
		return;
	}

	try {
		const contents = (await fs.readFile(filePath)).toString();

		return JSON.parse(contents);
	} catch (error) {
		if (error instanceof SyntaxError) {
			throw new PackageJsonCorruptError(project);
		}

		throw error;
	}
};

export const forceGetPackageJsonOfProject = async (project: Project) => {
	const packageJson = await getPackageJsonOfProject(project);

	if (!packageJson) {
		throw new PackageJsonNotFoundError(project);
	}

	return packageJson;
};

export * from "./find";
