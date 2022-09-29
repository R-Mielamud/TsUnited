import { TsUnitedError } from "./ts-united.error";

export class ValidationError extends TsUnitedError {
	public constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}
