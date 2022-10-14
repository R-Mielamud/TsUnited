import { ForkTsCheckerWebpackPluginOptions } from "fork-ts-checker-webpack-plugin/lib/plugin-options";

export type ForkTsCheckerConfig = Omit<
	ForkTsCheckerWebpackPluginOptions,
	"typescript"
> & {
	typescript?: Omit<
		ForkTsCheckerWebpackPluginOptions["typescript"],
		"context" | "configFile"
	>;
};
