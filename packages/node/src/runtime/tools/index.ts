import { create as createTsNodeService } from "ts-node";

import { Config, Project, ProjectTools } from "~/common";

import { createPathResolver } from "./resolver";

export const getProjectTools = (project: Project): ProjectTools => {
	const service = createTsNodeService({ cwd: project.path });

	const { baseUrl, paths } = service.config.options;
	const resolver = createPathResolver(baseUrl ?? project.path, paths ?? {});

	return { project, service, resolver };
};

export const getAllTools = (config: Config): ProjectTools[] => {
	return [config.rootProject, ...config.relatedProjects].map(getProjectTools);
};

export * from "./resolver";
export * from "./service";
