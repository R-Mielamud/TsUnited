import { PACKAGE_JSON_FILE_NAME } from "../constants";
import { findFileInParentPaths } from "../shared";
import { Project } from "../types";

export const findPackageJsonOfProject = (
	project: Project
): string | undefined => {
	return findFileInParentPaths(project.path, [PACKAGE_JSON_FILE_NAME]);
};
