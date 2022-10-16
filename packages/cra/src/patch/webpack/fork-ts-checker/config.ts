import { ForkTsCheckerWebpackPluginOptions } from "fork-ts-checker-webpack-plugin/lib/plugin-options";

export const patchForkTsCheckerConfig = (
	config: ForkTsCheckerWebpackPluginOptions
): ForkTsCheckerWebpackPluginOptions => {
	return {
		...config,
		logger: {
			log: () => {},
			error: console.error,
		},
	};
};
