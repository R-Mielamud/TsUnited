import { create as createTsNodeService, Service } from "ts-node";

import {
	Config,
	ProjectTools,
	isParent,
	NoProjectContainsFileError,
} from "~/common";

export const createRootService = (
	config: Config,
	projectTools: ProjectTools[]
): Service => {
	const compiler = (
		code: string,
		fileName: string,
		lineOffset = 0
	): string => {
		for (const { project, service } of projectTools) {
			if (isParent(project.path, fileName)) {
				return service.compile(code, fileName, lineOffset);
			}
		}

		throw new NoProjectContainsFileError(fileName);
	};

	const service = createTsNodeService({ cwd: config.rootProject.path });
	service.compile = compiler;

	return service;
};
