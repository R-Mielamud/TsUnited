import { validate, Schema } from "..";
import { Config } from "../types";

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
		unitedFolder: {
			type: "string",
			regex: /^[-a-zA-Z0-9_.]+$/,
		},
		rootProject: projectSchema,
		relatedProjects: {
			type: "array",
			items: projectSchema,
		},
	},
};

export const validateConfig = (config: any): config is Config => {
	validate("config", config, configSchema);

	return true;
};
