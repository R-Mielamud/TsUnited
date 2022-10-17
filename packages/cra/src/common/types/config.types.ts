import {
	Config as WebpackEditionConfig,
	Project,
} from "@ts-united/webpack/dist/common";

export interface Config extends Omit<WebpackEditionConfig, "projects"> {
	rootProject: Project;
	relatedProjects: Project[];
}
