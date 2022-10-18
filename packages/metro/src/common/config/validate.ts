import { RawConfig, Schema, validate, validateConfigProjectsList } from "..";

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
		rootProject: projectSchema,
		relatedProjects: {
			type: "array",
			items: projectSchema,
		},
	},
};

export const validateConfig = (config: RawConfig) => {
	validate("ts-united-config", config, configSchema);

	validateConfigProjectsList([
		config.rootProject,
		...(config.relatedProjects ?? []),
	]);
};
