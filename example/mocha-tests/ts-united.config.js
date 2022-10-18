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
	/* The main (also refered as root) project's information.
	This option is required.
	*/
	rootProject: {
		/* Any *unique* project name (id).
		This option is required.
		*/
		name: "mocha-tests",
		/* The path tsconfig.json file is located in, or any child path.
		Importing files that are outside all projects' paths is forbidden.
		The path can be absolute or relative to CWD
		This option is required.

		Here CWD is set to example folder, mocha-tests project is in example/mocha-tests, so it's path will be ./mocha-tests
		*/
		path: "./mocha-tests",
	},
	/* Array containing related projects info
	This option is not required. Default value - []
	*/
	relatedProjects: [
		{
			/* The same project info as in rootProject */
			name: "backend",
			path: "./backend",
		},
		{
			/* Important! Even if mocha-tests project doesn't need shared, but backend does, we still need to specify shared here. */
			name: "shared",
			path: "./shared",
		},
	],
};
