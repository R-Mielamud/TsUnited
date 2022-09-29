import { getTsconfig, Project, Tsconfig } from "~/common";

export const tsconfigCache = new Map<string, Tsconfig>();

export const getCachedTsconfig = async (
	project: Project
): Promise<Tsconfig> => {
	if (tsconfigCache.has(project.name)) {
		return tsconfigCache.get(project.name) as Tsconfig;
	}

	const tsconfigPath = await getTsconfig(project, false);
	tsconfigCache.set(project.name, tsconfigPath);

	return tsconfigPath;
};
