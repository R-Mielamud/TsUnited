import fs from "fs";

import {
	createMatchPathAsync,
	FileExistsAsync,
	ReadJsonAsync,
} from "tsconfig-paths";

import { Resolver } from "webpack";

import { DEFAULT_EXTENSIONS, Matcher, Project } from "~/common";
import { getCachedTsconfig } from "~/runtime";

export const getProjectExtensions = (project: Project): string[] => {
	return project.extensions ?? DEFAULT_EXTENSIONS;
};

export const createProjectMatcher = async (
	project: Project,
	resolver: Resolver
): Promise<Matcher> => {
	const tsconfig = await getCachedTsconfig(project);
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

	const readJson: ReadJsonAsync = (file, callback) => {
		if (resolver.fileSystem.readJson) {
			return resolver.fileSystem.readJson(file, (err, data) =>
				callback(err as Error | undefined, data)
			);
		}

		fs.readFile(file, (err, result) => {
			if (err) {
				return callback(err);
			}

			callback(undefined, JSON.parse(result.toString("utf-8")));
		});
	};

	const fileExists: FileExistsAsync = (file, callback) => {
		fs.stat(file, (err) => callback(undefined, !err));
	};

	return {
		match: (request: string) =>
			new Promise((resolve, reject) => {
				match(
					request,
					readJson,
					fileExists,
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
