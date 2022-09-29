export interface AnySchema {
	required?: boolean;
}

export interface StringSchema extends AnySchema {
	type: "string";
	minLength?: number;
	maxLength?: number;
	regex?: RegExp;
}

export interface IntSchema extends AnySchema {
	type: "int";
	min?: number;
	max?: number;
}

export interface FloatSchema extends AnySchema {
	type: "float";
	min?: number;
	max?: number;
}

export interface BoolSchema extends AnySchema {
	type: "boolean";
}

export interface ArraySchema extends AnySchema {
	type: "array";
	items: Schema;
	minLength?: number;
	maxLength?: number;
}

export interface ObjectSchema extends AnySchema {
	type: "object";
	properties: {
		[key: string | number]: Schema;
	};
}

export type Schema =
	| StringSchema
	| IntSchema
	| FloatSchema
	| BoolSchema
	| ArraySchema
	| ObjectSchema;
