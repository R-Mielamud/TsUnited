import { TsUnitedError } from "./ts-united.error";

export class NoProjectContainsPathError extends TsUnitedError {
	public constructor(path: string) {
		super(`No project contains path ${path}`);
	}
}
