import { Schema, validate } from "..";

export const configSchema: Schema = {
	type: "object",
	required: true,
	properties: {
		cwd: {
			type: "string",
			minLength: 1,
		},
		projects: {
			type: "array",
			required: true,
			items: {
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
			},
		},
	},
};

export const validateConfig = (config: any): void => {
	return validate("config", config, configSchema);
};
