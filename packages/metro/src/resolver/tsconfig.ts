import { getTsconfig, Project, Tsconfig } from "~/common";

export const tsconfigCache = new Map<string, Tsconfig>();

export const getCachedTsconfig = (project: Project): Tsconfig => {
	if (tsconfigCache.has(project.name)) {
		return tsconfigCache.get(project.name) as Tsconfig;
	}

	const tsconfigPath = getTsconfig(project, false);
	tsconfigCache.set(project.name, tsconfigPath);

	return tsconfigPath;
};
