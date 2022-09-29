import { TsconfigError } from "./tsconfig.error";

export class RootDirRequiredError extends TsconfigError {
	public constructor(project: string, overwrittenTo?: string) {
		super(
			`compilerOptions.rootDir in ${project}'s tsconfig is not set. ${
				overwrittenTo
					? `It will be set to ${overwrittenTo}`
					: "Also, none of your project's folders contain code, so it's impossible to determine rootDir automatically. Please add some code or set rootDir manually in tsconfig"
			}`
		);
	}
}
