import { TsUnitedError } from "../shared";

export class ReactScriptsNotFoundError extends TsUnitedError {
	constructor() {
		super(
			"react-scripts package was not found. Make sure all dependencies are installed correctly and your root project is using Create React App"
		);
	}
}
