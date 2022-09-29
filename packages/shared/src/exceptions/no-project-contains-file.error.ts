import { TsUnitedError } from "./ts-united.error";

export class NoProjectContainsFileError extends TsUnitedError {
	public constructor(file: string) {
		super(`No project contains file ${file}`);
	}
}
