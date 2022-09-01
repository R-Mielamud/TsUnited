import { ValidationError } from "../exceptions";

import {
	AnySchema,
	ArraySchema,
	BoolSchema,
	FloatSchema,
	IntSchema,
	ObjectSchema,
	Schema,
	StringSchema,
} from "../types";

const error = (name: string, message: string): never => {
	throw new ValidationError(name + " " + message);
};

const type = (object: any): string => {
	return Array.isArray(object)
		? "array"
		: object === null
		? "null"
		: typeof object === "number" && Number.isInteger(object)
		? "int"
		: typeof object === "number"
		? "float"
		: typeof object;
};

const blank = (object: any): object is null | undefined => {
	return object === null || object === undefined;
};

export const validateRequired = (
	name: string,
	object: any,
	schema: AnySchema
) => {
	if (!schema.required && blank(object)) {
		return;
	}

	error(name, "is required");
};

export const validateType = (
	name: string,
	object: any,
	expectedType: string
) => {
	const objType = type(object);

	if (objType !== expectedType) {
		return error(name, `must be a ${expectedType} but got ${objType}`);
	}
};

export const validateString = (
	name: string,
	object: string,
	schema: StringSchema
) => {
	if (schema.minLength && object.length < schema.minLength) {
		return error(name, `must be at least ${schema.minLength} chars long`);
	}

	if (schema.maxLength && object.length > schema.maxLength) {
		return error(name, `must be at most ${schema.minLength} chars long`);
	}

	if (schema.regex && !schema.regex.test(object)) {
		return error(name, `must match ${schema.regex}`);
	}
};

export const validateInt = (
	name: string,
	object: number,
	schema: IntSchema
) => {
	validateFloat(name, object, { ...schema, type: "float" } as FloatSchema);
};

export const validateFloat = (
	name: string,
	object: number,
	schema: FloatSchema
) => {
	if (schema.min && object < schema.min) {
		return error(name, `must be at least ${schema.min}`);
	}

	if (schema.max && object > schema.max) {
		return error(name, `must be at most ${schema.max}`);
	}
};

export const validateBool = (
	_name: string,
	_object: boolean,
	_schema: BoolSchema
) => {};

export const validateArray = (
	name: string,
	object: any[],
	schema: ArraySchema
) => {
	if (schema.minLength && object.length < schema.minLength) {
		return error(name, `must be at least ${schema.minLength} chars long`);
	}

	if (schema.maxLength && object.length > schema.maxLength) {
		return error(name, `must be at most ${schema.minLength} chars long`);
	}

	object.forEach((item, i) => {
		validate(`${name}[${i}]`, item, schema.items);
	});
};

export const validateObject = (
	name: string,
	object: Record<string | number, any>,
	schema: ObjectSchema
) => {
	Object.entries(schema.properties).forEach(([propName, propSchema]) => {
		validate(`${name}.${propName}`, object[propName], propSchema);
	});
};

export const validate = (name: string, object: any, schema: Schema): void => {
	validateRequired(name, object, schema);
	validateType(name, object, schema.type);

	switch (schema.type) {
		case "string":
			return validateString(name, object, schema);
		case "int":
			return validateInt(name, object, schema);
		case "float":
			return validateFloat(name, object, schema);
		case "boolean":
			return validateBool(name, object, schema);
		case "array":
			return validateArray(name, object, schema);
		case "object":
			return validateObject(name, object, schema);
	}
};
