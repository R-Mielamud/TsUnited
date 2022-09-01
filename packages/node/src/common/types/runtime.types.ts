import { Service } from "ts-node";

import { Project } from "./config.types";

export interface Resolver {
	(fileName: string, from?: NodeJS.Module): string;
}

export interface ProjectTools {
	project: Project;
	service: Service;
	resolver: Resolver;
}
