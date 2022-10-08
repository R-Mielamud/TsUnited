import fsSync from "fs";
import path from "path";
import { Project } from "@ts-united/webpack/dist/common";

import {
	NODE_MODULES_FOLDER,
	REACT_SCRIPTS_NAME,
	WEBPACK_CONFIG_NAMES,
} from "../constants";

import { ReactScriptsNotFoundError } from "../exceptions";
import { findFileInParentPaths } from "../shared";

export const findReactScripts = (rootProject: Project): string | undefined => {
	const reactScriptsFolder = path.join(
		NODE_MODULES_FOLDER,
		REACT_SCRIPTS_NAME
	);

	return findFileInParentPaths(rootProject.path, [reactScriptsFolder]);
};

export const findReactScriptsWebpackConfigs = (
	rootProject: Project
): { path: string; isLegacy: boolean }[] => {
	const configFiles = [];
	const reactScriptsFolder = findReactScripts(rootProject);

	if (!reactScriptsFolder) {
		throw new ReactScriptsNotFoundError();
	}

	for (const { name, isLegacy } of WEBPACK_CONFIG_NAMES) {
		const fullConfigPath = path.resolve(reactScriptsFolder, name);

		if (fsSync.existsSync(fullConfigPath)) {
			configFiles.push({ path: fullConfigPath, isLegacy });
		}
	}

	return configFiles;
};
