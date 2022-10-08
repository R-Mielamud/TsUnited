import path from "path";
import BaseForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { ForkTsCheckerWebpackPluginOptions } from "fork-ts-checker-webpack-plugin/lib/plugin-options";
import { forwardSlash } from "fork-ts-checker-webpack-plugin/lib/utils/path/forward-slash";
import { Compiler, WebpackPluginInstance } from "webpack";

import { Config, resolveConfig, validateConfig } from "~/common";

class ForkTsCheckerWebpackPlugin implements WebpackPluginInstance {
	protected config: Config;
	protected forkTsCheckerInstances: BaseForkTsCheckerWebpackPlugin[];

	public constructor(
		config: Config,
		forkTsCheckerConfig: ForkTsCheckerWebpackPluginOptions = {}
	) {
		validateConfig(config);
		this.config = resolveConfig(config);

		const forkTsCheckerExclusions =
			forkTsCheckerConfig.issue?.exclude ?? [];

		const forkTsCheckerArrayExclusions = Array.isArray(
			forkTsCheckerExclusions
		)
			? forkTsCheckerExclusions
			: [forkTsCheckerExclusions];

		this.forkTsCheckerInstances = config.projects.map(
			(project) =>
				new BaseForkTsCheckerWebpackPlugin({
					...forkTsCheckerConfig,
					typescript: {
						...forkTsCheckerConfig.typescript,
						context: project.path,
						configFile: undefined,
					},
					issue: {
						...forkTsCheckerConfig.issue,
						exclude: [
							...forkTsCheckerArrayExclusions,
							...config.projects
								.filter(
									({ name: excludedName }) =>
										excludedName !== project.name
								)
								.map(({ path: excludedPath }) => ({
									file: `${forwardSlash(
										path.relative(
											project.path,
											excludedPath
										)
									)}/**/*.*`,
								})),
						],
					},
				})
		);
	}

	public apply(compiler: Compiler) {
		this.forkTsCheckerInstances.map((plugin) => plugin.apply(compiler));
	}
}

// ForkTsCheckerWebpackPlugin doesn't assign it's name to a variable, so I need to use this a little bit dirty stuff
const UnitedForkTsCheckerPlugin = ForkTsCheckerWebpackPlugin;

export default UnitedForkTsCheckerPlugin;
