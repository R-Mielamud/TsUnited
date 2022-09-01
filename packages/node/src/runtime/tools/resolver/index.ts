import { isParent, ProjectTools, Resolver } from "~/common";

export const createRootResolver = (projectTools: ProjectTools[]): Resolver => {
	return (fileName, from) => {
		if (!from) {
			return fileName;
		}

		for (const { project, resolver } of projectTools) {
			if (isParent(project.path, from.path)) {
				return resolver(fileName, from);
			}
		}

		throw new Error(`No project contains the file ${fileName}`);
	};
};

export * from "./create-resolver";
