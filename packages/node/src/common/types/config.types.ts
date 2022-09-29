import { Tsconfig, BaseProject } from "~/common";

export interface Project extends BaseProject {
	tsconfig: Tsconfig;
}

export interface Config {
	unitedFolder?: string;
	rootProject: Project;
	relatedProjects: Project[];
}
