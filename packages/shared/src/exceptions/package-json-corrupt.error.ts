import { BaseProject } from "../types";
import { TsUnitedError } from "./ts-united.error";

export class PackageJsonCorruptError extends TsUnitedError {
	public constructor(project: BaseProject) {
		super(
			`package.json file of ${project.name} project doesn't contain valid JSON`
		);
	}
}
