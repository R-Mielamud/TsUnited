import { BaseProject } from "../shared";

export interface Project extends BaseProject {}

export interface RawConfig {
	cwd?: string;
	rootProject: Project;
	relatedProjects?: Project[];
}

export interface Config {
	cwd?: string;
	rootProject: Project;
	relatedProjects: Project[];
}
