import path from "path";

import {
	Config,
	validateConfig,
	findConfigFile,
	ConfigNotFoundError,
} from "..";

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

export * from "./validate";
export * from "./resolve";
