import { BaseProject } from "../shared";

export interface Project extends BaseProject {
	extensions?: string[];
}

export interface Config {
	cwd?: string;
	extensions?: string[];
	projects: Project[];
}
