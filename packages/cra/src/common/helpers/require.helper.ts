export const getFromRequireCacheByPath = (
	modulePath: string
): NodeJS.Module | undefined => {
	return require.cache[modulePath];
};

export const getModulePath = (moduleName: string): string => {
	return require.resolve(moduleName);
};

export const getFromRequireCache = (
	moduleName: string
): NodeJS.Module | undefined => {
	return getFromRequireCacheByPath(getModulePath(moduleName));
};

export const patchModuleInRequireCache = (
	modulePath: string,
	patchExports: (exports: any) => any
) => {
	require(modulePath);

	const originalModule = require.cache[modulePath] as NodeJS.Module;

	require.cache[modulePath] = {
		...originalModule,
		exports: patchExports(originalModule.exports),
	};
};

export const executeBinFile = (binPath: string) => {
	require(binPath);
};
