import { Configuration as WebpackConfig } from "webpack";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";

import {
	configToWebpackEditionConfig,
	Config,
	patchModuleInRequireCache,
	findReactScriptsWebpackConfigs,
} from "~/common";

import { replaceResolverPlugin } from "./resolver";
import { replaceBabelLoader } from "./loader";
import { patchPlugins } from "./plugins";

export const patchWebpackConfig = (
	webpackEditionConfig: WebpackEditionConfig,
	webpackConfig: WebpackConfig
): WebpackConfig => {
	return {
		...webpackConfig,
		resolve: {
			...webpackConfig.resolve,
			plugins: replaceResolverPlugin(
				webpackEditionConfig,
				webpackConfig.resolve?.plugins
			),
		},
		module: {
			...webpackConfig.module,
			rules: replaceBabelLoader(
				webpackEditionConfig,
				webpackConfig.module?.rules
			),
		},
		plugins: patchPlugins(webpackEditionConfig, webpackConfig.plugins),
	};
};

export const patchAllWebpackConfigs = (config: Config) => {
	const webpackEditionConfig = configToWebpackEditionConfig(config);
	const configs = findReactScriptsWebpackConfigs(config.rootProject);

	configs.forEach(({ path, isLegacy }) => {
		patchModuleInRequireCache(
			path,
			(
				configExport: WebpackConfig | ((mode: string) => WebpackConfig)
			) => {
				if (isLegacy || typeof configExport !== "function") {
					return patchWebpackConfig(
						webpackEditionConfig,
						configExport as WebpackConfig
					);
				} else {
					const patchedDev = patchWebpackConfig(
						webpackEditionConfig,
						configExport("development") as WebpackConfig
					);

					const patchedProd = patchWebpackConfig(
						webpackEditionConfig,
						configExport("production") as WebpackConfig
					);

					return (mode: string) =>
						mode === "development"
							? patchedDev
							: mode === "production"
							? patchedProd
							: undefined;
				}
			}
		);
	});
};
