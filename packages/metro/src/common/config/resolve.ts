import path from "path";

import { Config, Project } from "../types";

export const resolveProject = (config: Config, project: Project): Project => {
	return {
		...project,
		path: path.resolve(process.cwd(), config.cwd ?? "./", project.path),
	};
};

export const resolveConfig = (config: Config): Config => {
	return {
		...config,
		rootProject: resolveProject(config, config.rootProject),
		relatedProjects: config.relatedProjects.map((project) =>
			resolveProject(config, project)
		),
	};
};
