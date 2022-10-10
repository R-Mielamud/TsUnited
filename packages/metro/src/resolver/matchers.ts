import { createMatchPath } from "tsconfig-paths";

import { Matcher, Project } from "~/common";
import { getCachedTsconfig } from "./tsconfig";

export const matchersCache = new Map<string, Matcher>();

export const createProjectMatcher = (
	project: Project,
	extensions: string[]
): Matcher => {
	const tsconfig = getCachedTsconfig(project);

	if (!tsconfig.options.baseUrl) {
		return {
			match: (request) => request,
			tsconfig,
		};
	}

	const match = createMatchPath(
		tsconfig.options.baseUrl,
		tsconfig.options.paths ?? {},
		["main"]
	);

	return {
		match: (request: string) =>
			match(request, undefined, undefined, extensions),
		tsconfig,
	};
};

export const getCachedMatcher = (
	project: Project,
	extensions: string[]
): Matcher => {
	if (matchersCache.has(project.name)) {
		return matchersCache.get(project.name) as Matcher;
	}

	const matcher = createProjectMatcher(project, extensions);
	matchersCache.set(project.name, matcher);

	return matcher;
};
