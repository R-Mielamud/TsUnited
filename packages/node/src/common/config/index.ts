import path from "path";

import { Config, validateConfig } from "..";
import { findConfigFile } from "./find";
import { resolveConfig } from "./resolve";

export const getConfig = (): Config => {
	const configPath = findConfigFile();

	if (!configPath) {
		throw new Error("Config was not found.");
	}

	const configRelative: Config = require(configPath);
	const config = resolveConfig(path.dirname(configPath), configRelative);

	validateConfig(config);

	return config;
};

export * from "./resolve";
export * from "./find";
export * from "./validate";
