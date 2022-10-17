import { BaseProject } from "../types";
import { TsUnitedError } from "./ts-united.error";

export class PackageJsonNotFoundError extends TsUnitedError {
	public constructor(project: BaseProject) {
		super(`package.json file of ${project.name} project was not found`);
	}
}
