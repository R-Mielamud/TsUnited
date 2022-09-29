import { ValidationError } from "./validation.error";

export class TsconfigError extends ValidationError {
	public constructor(message: string) {
		super(message);
		this.name = "TsconfigError";
	}
}
