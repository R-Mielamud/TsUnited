import { TsconfigError } from "./tsconfig.error";

export class RootDirOutsideProjectError extends TsconfigError {
	public constructor(project: string, overwrittenTo?: string) {
		super(
			`compilerOptions.rootDir in ${project}'s tsconfig is set to directory outside the project's directory. ${
				overwrittenTo
					? `It will be overwritten and set to ${overwrittenTo}`
					: "Also, none of your project's folders contain code, so it's impossible to determine rootDir automatically. Please add some code or set rootDir manually in tsconfig"
			}`
		);
	}
}
