import { ProjectNameNotUniqueError } from "../exceptions";
import { BaseProject } from "../types";

export const validateConfigProjectsList = (projects: BaseProject[]) => {
	const foundNames = new Set();

	for (const project of projects) {
		if (foundNames.has(project.name)) {
			throw new ProjectNameNotUniqueError(project.name);
		}

		foundNames.add(project.name);
	}
};
