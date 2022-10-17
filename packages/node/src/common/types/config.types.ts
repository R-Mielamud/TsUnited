import { BaseProject, Tsconfig } from "~/common";

export interface Project extends BaseProject {}

export interface ProjectWithTsconfig extends Project {
	tsconfig: Tsconfig;
}

export interface Config {
	cwd?: string;
	unitedFolder?: string;
	rootProject: Project;
	relatedProjects: Project[];
}

export interface ConfigWithTsconfigsInProjects {
	cwd?: string;
	unitedFolder?: string;
	rootProject: ProjectWithTsconfig;
	relatedProjects: ProjectWithTsconfig[];
}
