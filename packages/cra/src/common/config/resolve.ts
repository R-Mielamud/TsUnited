import path from "path";

import { Config, RawConfig } from "../types";
import { Project } from "@ts-united/webpack/dist/common";

export const resolveProject = (
	baseDir: string,
	config: RawConfig,
	project: Project
): Project => {
	return {
		...project,
		path: path.resolve(baseDir, config.cwd ?? "./", project.path),
		extensions: project.extensions ?? config.extensions,
	};
};

export const resolveConfig = (baseDir: string, config: RawConfig): Config => {
	return {
		...config,
		rootProject: resolveProject(baseDir, config, config.rootProject),
		relatedProjects: (config.relatedProjects ?? []).map((project) =>
			resolveProject(baseDir, config, project)
		),
	};
};
