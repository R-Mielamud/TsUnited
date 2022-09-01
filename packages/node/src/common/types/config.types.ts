import { Tsconfig } from "./typescript.types";

export interface Project {
	name: string;
	path: string;
	tsconfig: Tsconfig;
}

export interface Config {
	unitedFolder?: string;
	rootProject: Project;
	relatedProjects: Project[];
}
