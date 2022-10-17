import path from "path";

import { Config } from "../types";
import { Project } from "@ts-united/webpack/dist/common";

export const resolveProject = (
	configFilePath: string,
	config: Config,
	project: Project
): Project => {
	return {
		...project,
		path: path.resolve(configFilePath, config.cwd ?? "./", project.path),
		extensions: project.extensions ?? config.extensions,
	};
};

export const resolveConfig = (
	configFilePath: string,
	config: Config
): Config => {
	return {
		...config,
		rootProject: resolveProject(configFilePath, config, config.rootProject),
		relatedProjects: (config.relatedProjects ?? []).map((project) =>
			resolveProject(configFilePath, config, project)
		),
	};
};
