import ts from "typescript";

import { BaseProject } from "..";

export const getTsconfigPath = (project: BaseProject): string | undefined => {
	return ts.findConfigFile(project.path, ts.sys.fileExists);
};

export const loadTsconfig = (tsconfigPath: string): any => {
	const { config } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

	return config;
};

export const parseTsconfig = (
	config: any,
	project: BaseProject
): ts.ParsedCommandLine => {
	const { options, fileNames, errors } = ts.parseJsonConfigFileContent(
		config,
		ts.sys,
		project.path
	);

	return { options, fileNames, errors };
};
