import path from "path";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";

import { Config } from "../types";
import { ConfigNotFoundError, findConfigFile } from "../shared";
import { validateConfig } from "./validate";
import { resolveConfig } from "./resolve";

export const getConfig = (): Config => {
	const configPath = findConfigFile();

	if (!configPath) {
		throw new ConfigNotFoundError();
	}

	const rawConfig = require(configPath);

	validateConfig(rawConfig);

	return resolveConfig(path.dirname(configPath), rawConfig);
};

export const configToWebpackEditionConfig = (
	config: Config
): WebpackEditionConfig => {
	return {
		...config,
		projects: [config.rootProject, ...(config.projects ?? [])],
	};
};

export * from "./resolve";
export * from "./validate";
