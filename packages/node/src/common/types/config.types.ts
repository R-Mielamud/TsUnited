import { Tsconfig, BaseProject } from "~/common";

export interface Project extends BaseProject {
	tsconfig: Tsconfig;
}

export interface Config {
	cwd?: string;
	unitedFolder?: string;
	rootProject: Project;
	relatedProjects: Project[];
}
