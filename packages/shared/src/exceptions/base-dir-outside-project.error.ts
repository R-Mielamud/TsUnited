import { TsconfigError } from "./tsconfig.error";

export class BaseDirOutsideProjectError extends TsconfigError {
	public constructor(project: string) {
		super(
			`compilerOptions.baseUrl in ${project}'s tsconfig is set to directory outside the project`
		);
	}
}
