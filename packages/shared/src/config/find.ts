import fs from "fs";
import path from "path";

export const CONFIG_FILE_NAME = [
	"ts-united.config.js",
	"ts-united.config.json",
	"ts-united.js",
	"ts-united.json",
	".tsunitedrc.js",
	".tsunitedrc.json",
	".unitedrc.js",
	".unitedrc.json",
];

export const findConfigFile = (): string | undefined => {
	let currentPath = __dirname;
	let nextPath: string;

	while (currentPath !== (nextPath = path.resolve(currentPath, "../"))) {
		for (const name of CONFIG_FILE_NAME) {
			const configPath = path.resolve(currentPath, name);

			if (fs.existsSync(configPath)) {
				return configPath;
			}
		}

		currentPath = nextPath;
	}
};
