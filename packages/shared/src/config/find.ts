import { CONFIG_FILE_NAME } from "../constants";
import { findFileInParentPaths } from "../helpers";

export const findConfigFile = (): string | undefined => {
	return findFileInParentPaths(__dirname, CONFIG_FILE_NAME);
};
