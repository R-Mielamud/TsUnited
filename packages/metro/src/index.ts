import { CustomResolver } from "metro-resolver";

import { RawConfig, resolveConfig, validateConfig } from "./common";
import { unitedMetroResolver } from "./resolver";

class UnitedMetroResolver {
	public readonly resolver: CustomResolver;
	public readonly watchFolders: string[];

	public constructor(rawConfig: RawConfig) {
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
