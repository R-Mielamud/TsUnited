import { ForkTsCheckerWebpackPluginOptions } from "fork-ts-checker-webpack-plugin/lib/plugin-options";
import { UnitedForkTsCheckerPlugin } from "@ts-united/webpack";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";

export class UnitedForkTsCheckerWarningPlugin extends UnitedForkTsCheckerPlugin {
	public constructor(
		config: WebpackEditionConfig,
		forkTsCheckerConfig: ForkTsCheckerWebpackPluginOptions = {}
	) {
		const inclusions = forkTsCheckerConfig.issue?.include ?? [];

		const inclusionsArray = Array.isArray(inclusions)
			? inclusions
			: [inclusions];

		super(config, {
			...forkTsCheckerConfig,
			issue: {
				...forkTsCheckerConfig.issue,
				include: inclusionsArray.map((inclusion) => ({
					...inclusion,
					severity: "warning",
				})),
			},
		});
	}
}
