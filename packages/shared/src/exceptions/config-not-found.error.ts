import { TsUnitedError } from "./ts-united.error";

export class ConfigNotFoundError extends TsUnitedError {
	public constructor() {
		super("Config was not found");
	}
}
