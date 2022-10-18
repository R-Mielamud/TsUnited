import {
	Config as WebpackEditionConfig,
	Project,
} from "@ts-united/webpack/dist/common";

export interface RawConfig extends Omit<WebpackEditionConfig, "projects"> {
	rootProject: Project;
	relatedProjects?: Project[];
}

export interface Config extends Omit<WebpackEditionConfig, "projects"> {
	rootProject: Project;
	relatedProjects: Project[];
}
