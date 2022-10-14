/* Almost all frontend frameworks allow overriding the underlying Webpack config
You can override their Webpack config by following the comments below and enjoy TS United
*/

const path = require("path");

const {
	UnitedPlugin,
	UnitedForkTsCheckerPlugin,
} = require("@ts-united/webpack");

const PUBLIC_DIR = path.join(__dirname, "public");

const TS_UNITED_CONFIG = {
	/* CWD is a base directory for all other directories in config. It can be either absolute or relative.
	It's recommended to construct absolute paths using `path.resolve()` function.
	If it's relative, it'll be relative to `process.cwd()` (the directory mocha command was run in).
	This option is not required. Default value - process.cwd()
	*/
	cwd: "../",
	/* Array of extensions TS United must allow to import
	This options is not required. Default value - [".js", ".jsx", ".ts", ".tsx", ".json"]
	*/
	extensions: [".ts", ".tsx"],
	/* Array containing *all* projects info (including main aka root project)
	This option is required.
	*/
	projects: [
		{
			/* Any *unique* project name (id).
			This option is required.
			*/
			name: "webpack-frontend",
			/* The path tsconfig.json file is located in, or any child path.
			Importing files that are outside all projects' paths is forbidden.
			The path can be absolute or relative to CWD
			This option is required.

			Here CWD is set to example folder, webpack-frontend project is in example/webpack-frontend, so it's path will be ./webpack-frontend
			*/
			path: "./webpack-frontend",
			/* Array of extensions TS United must allow *this project* to import
			This option is not required. Default value - the top-level `extensions` options
			*/
			extensions: [".ts", ".tsx"], // Set to default value
		},
		{
			/* The same project info */
			name: "shared",
			path: "./shared",
			/* Here extensions option is not set, so it's set to the top-level extensions option */
		},
	],
};

module.exports = {
	mode: process.env.NODE_ENV || "development",
	entry: "./src/index.ts",
	output: {
		path: PUBLIC_DIR,
		filename: "bundle.js",
	},
	devServer: {
		port: 3000,
		hot: true,
		static: {
			directory: PUBLIC_DIR,
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?/,
				use: {
					// For typescript files we use @ts-united/webpack as a loader and pass the config as options
					loader: "@ts-united/webpack",
					options: TS_UNITED_CONFIG,
				},
			},
			{
				test: /\.s[ac]ss/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	resolve: {
		/* Extensions that Webpack must allow. Don't confuse them with TS United extensions option!
		And don't forget to add .js and .jsx
		*/
		extensions: [".js", ".jsx", ".ts", ".tsx", ".sass", ".scss"],
		// Note that this is not the top-level plugins option. It's resolve.plugins option, only for resolver plugins
		plugins: [
			/* Then we must connect UnitedPlugin as a resolver plugin
			We also pass the config as the first argument
			*/
			new UnitedPlugin(TS_UNITED_CONFIG),
		],
	},
	plugins: [
		/* Then *if you want* you can connect UnitedForkTsCheckerPlugin to move TypeScript checks to a separate process
		Don't use ForkTsCheckerWebpackPlugin! It's not built for multiple TS projects.
		We pass TS United config as the first argument and optional ForkTsCheckerWebpackPlugin config as the second argument
		*/
		new UnitedForkTsCheckerPlugin(TS_UNITED_CONFIG, {
			/* I can add some ForkTsCheckerWebpackPlugin config here, but I don't wanna.
			TS United will automatically set tsconfig.json path.
			*/
		}),
	],
	snapshot: {
		managedPaths: [
			path.resolve(__dirname, "./node_modules"),
			path.resolve(__dirname, "../shared/node_modules"),
		],
	},
};
