import { BaseProject, Tsconfig } from "~/common";

export interface Project extends BaseProject {}

export interface ProjectWithTsconfig extends Project {
	tsconfig: Tsconfig;
}

export interface RawConfig {
	cwd?: string;
	unitedFolder?: string;
	rootProject: Project;
	relatedProjects?: Project[];
}

export interface Config {
	cwd?: string;
	unitedFolder: string;
	rootProject: Project;
	relatedProjects: Project[];
}

export interface ConfigWithTsconfigsInProjects
	extends Omit<Config, "rootProject" | "relatedProjects"> {
	rootProject: ProjectWithTsconfig;
	relatedProjects: ProjectWithTsconfig[];
}
