import { TsUnitedError } from "./ts-united.error";

export class TsconfigNotFoundError extends TsUnitedError {
	public constructor(project: string) {
		super(`Tsonfig for project ${project} was not found`);
	}
}
