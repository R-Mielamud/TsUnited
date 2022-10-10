export class TsUnitedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "TsUnitedError";
	}

	public warn() {
		console.warn(`Warning: ${this.message}`);
	}
}
