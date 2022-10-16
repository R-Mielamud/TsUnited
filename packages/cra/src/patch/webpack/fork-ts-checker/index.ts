import { WebpackPluginInstance } from "webpack";
import { UnitedForkTsCheckerPlugin } from "@ts-united/webpack";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";

import {
	FORK_TS_CHECKER_PLUGIN_NAME,
	FORK_TS_CHECKER_WARNING_PLUGIN_NAME,
} from "~/common";

import { UnitedForkTsCheckerWarningPlugin } from "./warning-plugin";
import { patchForkTsCheckerConfig } from "./config";

export const replaceForkTsCheckerPlugin = (
	webpackEditionConfig: WebpackEditionConfig,
	plugins?: WebpackPluginInstance[]
): WebpackPluginInstance[] | undefined => {
	return plugins?.map((plugin) =>
		plugin.constructor.name === FORK_TS_CHECKER_PLUGIN_NAME
			? new UnitedForkTsCheckerPlugin(
					webpackEditionConfig,
					// TypeScript says that options are inaccessible, but technically they're accessible
					patchForkTsCheckerConfig((plugin as any).options)
			  )
			: plugin.constructor.name === FORK_TS_CHECKER_WARNING_PLUGIN_NAME
			? new UnitedForkTsCheckerWarningPlugin(
					webpackEditionConfig,
					patchForkTsCheckerConfig((plugin as any).options) // And here too
			  )
			: plugin
	);
};

export * from "./config";
export * from "./warning-plugin";
