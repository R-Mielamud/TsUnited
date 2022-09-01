import { register as registerTsNode } from "ts-node";

import { getConfig } from "~/common";

import { getAllTools, createRootResolver, createRootService } from "./tools";

const Module = require("module");

export const register = () => {
	const config = getConfig();
	const projectTools = getAllTools(config);
	const service = createRootService(config, projectTools);
	const resolver = createRootResolver(projectTools);

	registerTsNode(service);
	Module._resolveFilename = resolver;
};

export * from "./tools";
