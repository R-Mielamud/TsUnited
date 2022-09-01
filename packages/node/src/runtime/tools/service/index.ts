import { create as createTsNodeService, Service } from "ts-node";

import { Config, ProjectTools, isParent } from "~/common";

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

		throw new Error(`No project contains the file ${fileName}`);
	};

	const service = createTsNodeService({ cwd: config.rootProject.path });
	service.compile = compiler;

	return service;
};
