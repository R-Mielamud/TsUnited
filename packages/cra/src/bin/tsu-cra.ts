import path from "path";

import {
	executeBinFile,
	getConfig,
	REACT_SCRIPTS_NAME,
	REACT_SCRIPTS_SCRIPTS_FOLDER,
	REACT_SCRIPTS_SCRIPT_NAMES,
} from "~/common";

import { patchAllWebpackConfigs } from "~/patch";

const printUsage = () => {
	console.log(`Usage: tsu-cra <script> [...args]

    <script>: react-scripts command name: start, build or test
    [...args]: any additonal args for the command`);
};

const main = () => {
	const args = process.argv.slice(2);

	if (args.length < 1) {
		return printUsage();
	}

	const [script, ...scriptArgs] = args;

	if (!Object.keys(REACT_SCRIPTS_SCRIPT_NAMES).includes(script as string)) {
		return printUsage();
	}

	const scriptPath = require.resolve(
		path.join(
			REACT_SCRIPTS_NAME,
			REACT_SCRIPTS_SCRIPTS_FOLDER,
			REACT_SCRIPTS_SCRIPT_NAMES[script as string] as string
		)
	);

	process.env.NODE_ENV = process.env.NODE_ENV || "development";
	process.argv = [...process.argv.slice(0, 2), ...scriptArgs];

	const config = getConfig();

	patchAllWebpackConfigs(config);
	executeBinFile(scriptPath);
};

main();
