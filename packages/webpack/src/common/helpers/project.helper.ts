import { isParent } from "../shared";
import { Config, Project } from "../types";

export const getProjectByPath = (
	path: string,
	config: Config
): Project | undefined => {
	return config.projects.find((project) => isParent(project.path, path));
};
