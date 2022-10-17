import { BaseProject } from "../shared";

export interface Project extends BaseProject {}

export interface Config {
	cwd?: string;
	rootProject: Project;
	relatedProjects: Project[];
}
