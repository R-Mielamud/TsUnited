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

	const configRelative: Config = require(configPath);
	const config = resolveConfig(path.dirname(configPath), configRelative);

	validateConfig(config);

	return config;
};

export * from "./validate";
export * from "./resolve";
