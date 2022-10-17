import { isParent } from "../helpers";
import { BaseProject } from "../types";

export const getProjectByPath = (
	path: string,
	projects: BaseProject[]
): BaseProject | undefined => {
	let foundProject: BaseProject | undefined;

	projects.forEach((project) => {
		if (!isParent(project.path, path)) {
			return;
		}

		if (!foundProject || isParent(project.path, foundProject.path)) {
			foundProject = project;
		}
	});

	return foundProject;
};
