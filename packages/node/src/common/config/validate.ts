import { validate } from "../helpers";
import { Config, Schema } from "../types";

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
	properties: {
		unitedFolder: {
			type: "string",
			regex: /^[-a-zA-Z0-9_.]+$/,
		},
		rootProject: projectSchema,
		relatedProjects: {
			type: "array",
			required: true,
			items: projectSchema,
		},
	},
};

export const validateConfig = (config: any): config is Config => {
	validate("config", config, configSchema);
	return true;
};
