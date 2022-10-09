import { createMatchPathAsync } from "tsconfig-paths";

import { DEFAULT_EXTENSIONS, Matcher, Project } from "~/common";
import { getCachedTsconfig } from "~/runtime";

export const getProjectExtensions = (project: Project): string[] => {
	return project.extensions ?? DEFAULT_EXTENSIONS;
};

export const createProjectMatcher = (project: Project): Matcher => {
	const tsconfig = getCachedTsconfig(project);
	const extensions = getProjectExtensions(project);

	if (!tsconfig.options.baseUrl) {
		return {
			match: async (request) => request,
			tsconfig,
		};
	}

	const match = createMatchPathAsync(
		tsconfig.options.baseUrl,
		tsconfig.options.paths ?? {},
		["main"]
	);

	return {
		match: (request: string) =>
			new Promise((resolve, reject) => {
				match(
					request,
					undefined,
					undefined,
					extensions,
					(err, result) => {
						if (err) {
							return reject(err);
						}

						resolve(result);
					}
				);
			}),
		tsconfig,
	};
};
