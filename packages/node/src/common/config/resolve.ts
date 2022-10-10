import path from "path";

import { Config, DEFAULT_UNITED_FOLDER, Project } from "~/common";

export const resolveProject = (baseDir: string, project: Project): Project => {
	return {
		...project,
		path: path.resolve(baseDir, project.path),
	};
};

export const resolveConfig = (baseDir: string, config: Config): Config => {
	if (config.cwd) {
		baseDir = path.resolve(baseDir, config.cwd);
	}

	return {
		...config,
		unitedFolder: config.unitedFolder ?? DEFAULT_UNITED_FOLDER,
		rootProject: resolveProject(baseDir, config.rootProject),
		relatedProjects: config.relatedProjects
			? config.relatedProjects.map((project) =>
					resolveProject(baseDir, project)
			  )
			: [],
	};
};
