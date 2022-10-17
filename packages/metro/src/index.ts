import { CustomResolver } from "metro-resolver";

import { Config, resolveConfig, validateConfig } from "./common";
import { unitedMetroResolver } from "./resolver";

class UnitedMetroResolver {
	public readonly resolver: CustomResolver;
	public readonly watchFolders: string[];

	public constructor(rawConfig: Config) {
		validateConfig(rawConfig);
		const config = resolveConfig(rawConfig);

		this.resolver = unitedMetroResolver(config);

		this.watchFolders = [config.rootProject, ...config.relatedProjects].map(
			(project) => project.path
		);
	}
}

export default UnitedMetroResolver;
export { UnitedMetroResolver };
