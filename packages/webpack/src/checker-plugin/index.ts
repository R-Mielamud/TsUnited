import { Compiler, WebpackPluginInstance } from "webpack";

import {
	Config,
	ForkTsCheckerConfig,
	resolveConfig,
	validateConfig,
} from "~/common";

import ProjectForkTsCheckerPlugin from "./project-plugin";

export default class UnitedForkTsCheckerPlugin
	implements WebpackPluginInstance
{
	protected config: Config;
	protected projectPluginInstances: ProjectForkTsCheckerPlugin[];

	public constructor(
		rawConfig: Config,
		forkTsCheckerConfig: ForkTsCheckerConfig = {}
	) {
		validateConfig(rawConfig);
		this.config = resolveConfig(rawConfig);

		this.projectPluginInstances = this.config.projects.map(
			(project) =>
				new ProjectForkTsCheckerPlugin(
					this.config,
					project,
					forkTsCheckerConfig
				)
		);
	}

	public apply(compiler: Compiler) {
		this.projectPluginInstances.forEach((plugin) => plugin.apply(compiler));
	}
}
