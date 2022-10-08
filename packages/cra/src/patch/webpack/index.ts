import { Configuration as WebpackConfig } from "webpack";
import { UnitedPlugin, UnitedForkTsCheckerPlugin } from "@ts-united/webpack";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";
import { ForkTsCheckerWebpackPluginOptions } from "fork-ts-checker-webpack-plugin/lib/plugin-options";

import {
	configToWebpackEditionConfig,
	Config,
	patchModuleInRequireCache,
	findReactScriptsWebpackConfigs,
	FORK_TS_CHECKER_PLUGIN_NAME,
	MODULE_SCOPE_PLUGIN_NAME,
	FORK_TS_CHECKER_WARNING_PLUGIN_NAME,
} from "~/common";

import { UnitedForkTsCheckerWarningPlugin } from "./united-fork-ts-checker-warning-plugin";

export const patchForkTsCheckerConfig = (
	config: ForkTsCheckerWebpackPluginOptions
): ForkTsCheckerWebpackPluginOptions => {
	return {
		...config,
		logger: "webpack-infrastructure",
	};
};

export const patchWebpackConfig = (
	webpackEditionConfig: WebpackEditionConfig,
	webpackConfig: WebpackConfig
): WebpackConfig => {
	const filteredResolvers = webpackConfig.resolve?.plugins?.filter(
		(plugin) => plugin.constructor.name !== MODULE_SCOPE_PLUGIN_NAME
	);

	const substitutedPlugins = webpackConfig.plugins?.map((plugin) =>
		plugin.constructor.name === FORK_TS_CHECKER_PLUGIN_NAME
			? new UnitedForkTsCheckerPlugin(
					webpackEditionConfig,
					patchForkTsCheckerConfig((plugin as any).options) // I really wanna access the options
			  )
			: plugin.constructor.name === FORK_TS_CHECKER_WARNING_PLUGIN_NAME
			? new UnitedForkTsCheckerWarningPlugin(
					webpackEditionConfig,
					patchForkTsCheckerConfig((plugin as any).options) // And here too
			  )
			: plugin
	);

	return {
		...webpackConfig,
		resolve: {
			...webpackConfig.resolve,
			plugins: [
				new UnitedPlugin(webpackEditionConfig),
				...(filteredResolvers ?? []),
			],
		},
		module: {
			...webpackConfig.module,
			rules: [
				{
					test: /\.tsx?/,
					use: {
						loader: "@ts-united/webpack",
						options: webpackEditionConfig,
					},
				},
				...(webpackConfig.module?.rules ?? []),
			],
		},
		plugins: substitutedPlugins ?? [],
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
