import { CustomResolver, resolve as baseResolver } from "metro-resolver";

import { Config, getProjectByPath, NoProjectContainsFileError } from "~/common";
import { getCachedMatcher } from "./matchers";

export const unitedMetroResolver = (config: Config): CustomResolver => {
	return (context, moduleName, platform) => {
		const project = getProjectByPath(
			context.originModulePath,
			config.projects
		);

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
