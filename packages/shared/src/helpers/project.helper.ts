import { isParent } from "../helpers";
import { BaseProject } from "../types";

export const getProjectByPath = (
	path: string,
	projects: BaseProject[]
): BaseProject | undefined => {
	return projects.find((project) => isParent(project.path, path));
};
