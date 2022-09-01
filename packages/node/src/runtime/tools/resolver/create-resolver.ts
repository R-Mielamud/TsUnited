import { register as registerPathResolver } from "tsconfig-paths";

import { Resolver } from "~/common";

const Module = require("module");

export const createPathResolver = (
	baseUrl: string,
	paths: Record<string, string[]>
): Resolver => {
	const unregister = registerPathResolver({
		baseUrl,
		paths,
	});

	const resolver: Resolver = Module._resolveFilename;
	unregister();

	return resolver;
};
