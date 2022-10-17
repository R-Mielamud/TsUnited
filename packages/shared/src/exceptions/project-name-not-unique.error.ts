import { ValidationError } from "./validation.error";

export class ProjectNameNotUniqueError extends ValidationError {
	public constructor(name: string) {
		super(`Project name '${name}' is not unique`);
	}
}
