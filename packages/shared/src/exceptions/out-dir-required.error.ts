import { TsconfigError } from "./tsconfig.error";

export class OutDirRequiredError extends TsconfigError {
	public constructor(project: string) {
		super(
			`compilerOptions.outDir in ${project}'s tsconfig is required. If you're sure you want to add the united folder and root project's files to the root project's directory, set the outDir to "./" (without quotes)`
		);
	}
}
