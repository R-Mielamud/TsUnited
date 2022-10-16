import { WebpackPluginInstance } from "webpack";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";

import { REACT_REFRESH_PLUGIN_NAME } from "~/common";
import { replaceForkTsCheckerPlugin } from "../fork-ts-checker";

export const patchPlugins = (
	webpackEditionConfig: WebpackEditionConfig,
	plugins?: WebpackPluginInstance[]
): WebpackPluginInstance[] | undefined => {
	return replaceForkTsCheckerPlugin(
		webpackEditionConfig,
		plugins?.filter(
			(plugin) =>
				![REACT_REFRESH_PLUGIN_NAME].includes(plugin.constructor.name)
		)
	);
};
