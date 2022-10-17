const {UnitedMetroResolver} = require('@ts-united/metro');

const TS_UNITED_CONFIG = {
	/* CWD is a base directory for all other directories in config. It can be either absolute or relative.
	It's recommended to construct absolute paths using `path.resolve()` function.
	If it's relative, it'll be relative to `process.cwd()` (the directory react-native command was run in).
	This option is not required. Default value - process.cwd()
	*/
	cwd: '../',
	/* The main (also refered as root) project's information.
	This option is required.
	*/
	rootProject: {
		/* Any *unique* project name (id).
		This option is required.
		*/
		name: 'react-native-mobile',
		/* The path tsconfig.json file is located in, or any child path.
		Importing files that are outside all projects' paths is forbidden.
		The path can be absolute or relative to CWD
		This option is required.

		Here CWD is set to example folder, react-native-mobile project is in example/react-native-mobile, so it's path will be ./react-native-mobile
		*/
		path: './react-native-mobile',
	},
	/* Array containing related projects info
	This option is not required. Default value - []
	*/
	relatedProjects: [
		{
			/* The same project info as in rootProject */
			name: 'shared',
			path: './shared',
		},
	],
};

const unitedResolver = new UnitedMetroResolver(TS_UNITED_CONFIG);

module.exports = {
	/* Here we pass watchFolders provided by UnitedMetroResolver to Metro to tell metro to watch all projects' folders */
	watchFolders: unitedResolver.watchFolders,
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
	resolver: {
		/* And here we pass the module resolution function provided UnitedMetroResolver to Metro */
		resolveRequest: unitedResolver.resolver,
	},
};
