import path from "path";
import { CustomResolver, resolve as baseResolver } from "metro-resolver";

import {
	BABEL_RUNTIME_REGEX,
	Config,
	getProjectByPath,
	NoProjectContainsFileError,
} from "~/common";

import { getCachedMatcher } from "./matchers";

export const unitedMetroResolver = (config: Config): CustomResolver => {
	return (context, moduleName, platform) => {
		if (BABEL_RUNTIME_REGEX.test(moduleName)) {
			return baseResolver(
				{
					...context,
					resolveRequest: undefined,
					originModulePath: `${config.rootProject.path}${path.sep}.`,
				},
				moduleName,
				platform
			);
		}

		const project = getProjectByPath(context.originModulePath, [
			config.rootProject,
			...config.relatedProjects,
		]);

		if (!project) {
			throw new NoProjectContainsFileError(context.originModulePath);
		}

		const matcher = getCachedMatcher(
			project,
			context.sourceExts.map((ext) => `.${ext}`)
		);

		const matched = matcher.match(moduleName);

		return baseResolver(
			{ ...context, resolveRequest: undefined },
			matched ?? moduleName,
			platform
		);
	};
};
