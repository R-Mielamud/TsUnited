import path from "path";
import { Config, Project } from "~/common";

export const resolveProject = (baseDir: string, project: Project): Project => {
	return {
		...project,
		path: path.resolve(baseDir, project.path),
	};
};

export const resolveConfig = (baseDir: string, config: Config): Config => {
	return {
		...config,
		rootProject: resolveProject(baseDir, config.rootProject),
		relatedProjects: config.relatedProjects.map((project) =>
			resolveProject(baseDir, project)
		),
	};
};
