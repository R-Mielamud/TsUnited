/* We export the config as an object. This file is required */

/* Possible config file names (without extensions) are:
- ts-united.config
- ts-united
- .tsunitedrc
- .unitedrc

The file can be in either JS or JSON format with corresponding extension added to the name.
*/

module.exports = {
	/* CWD is a base directory for all other directories in config. It can be either absolute or relative.
	It's recommended to construct absolute paths using `path.resolve()` function.
	If it's relative, it'll be relative to the directory config file is located in.
	This option is not required. Default value - the directory config file is located in
	*/
	cwd: "../",
	/* Array of extensions path aliases will be implicitly resolved to.
	For example, here `~/myfile` can become either `./myfile.ts` or `./myfile.tsx`.
	This option is not required. Default value - [".js", ".jsx", ".ts", ".tsx", ".json"]
	*/
	extensions: [".ts", ".tsx"],
	/* The main (also refered as root) project's information.
	This option is required.
	*/
	rootProject: {
		/* Any *unique* project name (id).
		This option is required.
		*/
		name: "cra-frontend",
		/* The path tsconfig.json file is located in or any child path.
		Importing files that are outside all projects' paths is forbidden.
		The path can be absolute or relative to CWD
		This option is required.

		Here CWD is set to example folder, cra-frontend project is in example/cra-frontend, so it's path will be ./cra-frontend
		*/
		path: "./cra-frontend",
		/* Array of extensions path aliases *of this project* will be implicitly resolved to.
		This option is not required. Default value - the top-level `extensions` options
		*/
		extensions: [".ts", ".tsx"], // Set to default value
	},
	/* Array containing related projects info
	This option is not required. Default value - []
	*/
	relatedProjects: [
		{
			/* The same project info as in rootProject */
			name: "shared",
			path: "./shared",
			/* Here extensions option is not set, so it's set to the top-level extensions option */
		},
	],
};
