import { TsconfigError } from "./tsconfig.error";

export class OutDirRequiredError extends TsconfigError {
	public constructor(project: string) {
		super(`compilerOptions.outDir in ${project}'s tsconfig is required`);
	}
}
