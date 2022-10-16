export const NODE_MODULES_FOLDER = "node_modules";
export const REACT_SCRIPTS_NAME = "react-scripts";
export const REACT_SCRIPTS_SCRIPTS_FOLDER = "scripts";
export const BABEL_LOADER_NAME = "babel-loader";
export const BABEL_LOADER_PATH = require.resolve(BABEL_LOADER_NAME);
export const MODULE_SCOPE_PLUGIN_NAME = "ModuleScopePlugin";
export const REACT_REFRESH_PLUGIN_NAME = "ReactRefreshPlugin";
export const FORK_TS_CHECKER_PLUGIN_NAME = "ForkTsCheckerWebpackPlugin";

export const FORK_TS_CHECKER_WARNING_PLUGIN_NAME =
	"ForkTsCheckerWarningWebpackPlugin";

export const REACT_SCRIPTS_SCRIPT_NAMES: Record<string, string> = {
	start: "start.js",
	build: "build.js",
	test: "test.js",
};

export const WEBPACK_CONFIG_NAMES = [
	{ name: "config/webpack.config.js", isLegacy: false },
	{ name: "config/webpack.config.dev.js", isLegacy: true },
	{ name: "config/webpack.config.prod.js", isLegacy: true },
];
