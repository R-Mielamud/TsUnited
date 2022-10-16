import { RuleSetRule } from "webpack";
import { Config as WebpackEditionConfig } from "@ts-united/webpack/dist/common";
import {
	BABEL_LOADER_NAME,
	BABEL_LOADER_PATH,
	NODE_MODULES_FOLDER,
} from "~/common";

export const isBabelLoader = (loader?: string): boolean => {
	return Boolean(
		loader && [BABEL_LOADER_NAME, BABEL_LOADER_PATH].includes(loader)
	);
};

export const replaceBabelLoader = (
	webpackEditionConfig: WebpackEditionConfig,
	rules?: (RuleSetRule | "...")[]
): (RuleSetRule | "...")[] | undefined => {
	let foundBabelLoader = false;

	return rules?.map((rule) =>
		typeof rule !== "string" && rule.oneOf
			? {
					oneOf: rule.oneOf.map((rule) => {
						if (foundBabelLoader) {
							return rule;
						}

						if (isBabelLoader(rule.loader)) {
							foundBabelLoader = true;

							return {
								test: /\.(js|mjs|jsx|ts|tsx)$/,
								include: webpackEditionConfig.projects.map(
									(project) => project.path
								),
								exclude: [new RegExp(NODE_MODULES_FOLDER)],
								loader: "@ts-united/webpack",
								options: webpackEditionConfig,
							};
						}

						return rule;
					}),
			  }
			: rule
	);
};
