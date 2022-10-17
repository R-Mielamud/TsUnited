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
	If it's relative, it'll be relative to `process.cwd()` (the directory tsu-node/tsu-node-compile command was run in).
	This option is not required. Default value - process.cwd()
	*/
	cwd: "../",
	/* United folder is a folder in main project's output folder, that will contain built related projects
	United folder option expects only folder name, not path.
	This options is not required. Default value - .united_projects (with dot)
	*/
	unitedFolder: ".united_projects", // Set to default value
	/* The main (also refered as root) project's information.
	This option is required.
	*/
	rootProject: {
		/* Any *unique* project name (id).
		This option is required.
		*/
		name: "backend",
		/* The path tsconfig.json file is located in, or any child path.
		Importing files that are outside all projects' paths is forbidden.
		The path can be absolute or relative to CWD
		This option is required.

		Here CWD is set to example folder, backend project is in example/backend, so it's path will be ./backend
		*/
		path: "./backend",
	},
	/* Array containing related projects info
	This option is not required. Default value - []
	*/
	relatedProjects: [
		{
			/* The same project info as in rootProject */
			name: "shared",
			path: "./shared",
		},
	],
};
