import path from "path";

import { Config, Project, RawConfig } from "../types";

export const resolveProject = (
	config: RawConfig,
	project: Project
): Project => {
	return {
		...project,
		path: path.resolve(process.cwd(), config.cwd ?? "./", project.path),
	};
};

export const resolveConfig = (config: RawConfig): Config => {
	return {
		...config,
		rootProject: resolveProject(config, config.rootProject),
		relatedProjects: (config.relatedProjects ?? []).map((project) =>
			resolveProject(config, project)
		),
	};
};
