import {
	isParent,
	NoProjectContainsFileError,
	ProjectTools,
	Resolver,
} from "~/common";

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

		throw new NoProjectContainsFileError(fileName);
	};
};

export * from "./create-resolver";
