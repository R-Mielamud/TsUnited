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
		projects: config.projects.map((project) =>
			resolveProject(config, project)
		),
	};
};
