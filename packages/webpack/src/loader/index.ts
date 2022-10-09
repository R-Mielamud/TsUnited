import path from "path";
import tsloader from "ts-loader";
import { LoaderOptions as TsloaderOptions } from "ts-loader/dist/interfaces";
import { LoaderContext } from "webpack";

import {
	Config,
	getProjectByPath,
	NoProjectContainsFileError,
	resolveConfig,
	SUPPRESSED_DIAGNOSTICS,
	validateConfig,
} from "~/common";

import { getCachedTsconfig } from "~/runtime";

export default function unitedLoader(
	this: LoaderContext<Config>,
	source: string
): void {
	const callback = this.async();

	const rawConfig = this.getOptions();
	validateConfig(rawConfig);

	const config = resolveConfig(rawConfig);
	const sourcePath = this.resourcePath;

	const project = getProjectByPath(sourcePath, config);

	if (!project) {
		throw new NoProjectContainsFileError(sourcePath);
	}

	let tsconfigPath: string;

	try {
		tsconfigPath = getCachedTsconfig(project).path;
	} catch (err) {
		return callback(err as Error);
	}

	const tsloaderOptions: Partial<TsloaderOptions> = {
		configFile: tsconfigPath,
		ignoreDiagnostics: SUPPRESSED_DIAGNOSTICS,
		reportFiles: [path.join(project.path, "**", "*.*")],
	};

	const tsloaderContext: LoaderContext<Partial<TsloaderOptions>> = {
		...this,
		query: typeof this.query === "string" ? this.query : tsloaderOptions,
		async: () => callback,
		getOptions: () => tsloaderOptions,
	};

	tsloader.call(
		tsloaderContext as any, // Issue in ts-loader's types
		source
	);
}
