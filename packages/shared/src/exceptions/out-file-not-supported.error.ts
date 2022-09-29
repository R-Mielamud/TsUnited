import { TsconfigError } from "./tsconfig.error";

export class OutFileNotSupportedError extends TsconfigError {
	public constructor(project: string) {
		super(
			`compilerOptions.outFile in tsconfig is currently not supported (set in ${project}'s tsconfig). Please use compilerOptions.outDir`
		);
	}
}
