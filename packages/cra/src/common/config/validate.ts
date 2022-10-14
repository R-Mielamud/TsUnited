import { Schema, validate } from "..";

export const projectSchema: Schema = {
	type: "object",
	required: true,
	properties: {
		name: {
			type: "string",
			required: true,
			minLength: 1,
			regex: /^[-a-zA-Z0-9_.]+$/,
		},
		path: {
			type: "string",
			required: true,
			minLength: 1,
		},
		extensions: {
			type: "array",
			items: {
				type: "string",
				required: true,
				regex: /^\.[a-zA-Z0-9]+$/,
			},
		},
	},
};

export const configSchema: Schema = {
	type: "object",
	required: true,
	properties: {
		cwd: {
			type: "string",
			minLength: 1,
		},
		extensions: {
			type: "array",
			items: {
				type: "string",
				required: true,
				regex: /^\\..*$/,
			},
		},
		rootProject: projectSchema,
		relatedProjects: {
			type: "array",
			items: projectSchema,
		},
	},
};

export const validateConfig = (config: any): void => {
	return validate("ts-united-config", config, configSchema);
};
