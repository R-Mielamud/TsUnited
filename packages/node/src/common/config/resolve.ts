import path from "path";

import { Config, DEFAULT_UNITED_FOLDER, Project, RawConfig } from "~/common";

export const resolveProject = (
	baseDir: string,
	config: RawConfig,
	project: Project
): Project => {
	return {
		...project,
		path: path.resolve(baseDir, config.cwd ?? "./", project.path),
	};
};

export const resolveConfig = (baseDir: string, config: RawConfig): Config => {
	return {
		...config,
		unitedFolder: config.unitedFolder ?? DEFAULT_UNITED_FOLDER,
		rootProject: resolveProject(baseDir, config, config.rootProject),
		relatedProjects: (config.relatedProjects ?? []).map((project) =>
			resolveProject(baseDir, config, project)
		),
	};
};
