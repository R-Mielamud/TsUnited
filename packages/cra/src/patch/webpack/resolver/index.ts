import { ResolvePluginInstance } from "webpack";
import { UnitedPlugin } from "@ts-united/webpack";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";

import { MODULE_SCOPE_PLUGIN_NAME } from "~/common";

export const replaceResolverPlugin = (
	webpackEditionConfig: WebpackEditionConfig,
	resolvers?: (ResolvePluginInstance | "...")[]
): (ResolvePluginInstance | "...")[] | undefined => {
	const filteredResolvers = resolvers?.filter(
		(plugin) => plugin.constructor.name !== MODULE_SCOPE_PLUGIN_NAME
	);

	return [
		new UnitedPlugin(webpackEditionConfig),
		...(filteredResolvers ?? []),
	];
};
