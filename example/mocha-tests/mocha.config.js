const SECOND = 1000;

module.exports = {
	require: [
		// Mocha will import this module, which registers TS United services
		"@ts-united/node/register",
		// After registering TS United we can use our path mapping, import typescript files and files from other projects
		// `~/setup.ts` is `./src/setup.ts`
		"~/setup.ts",
	],
	timeout: 20 * SECOND,
	slow: 7 * SECOND,
	bail: false,
	parallel: false,
	jobs: 1,
	spec: ["./src/specs/*.spec.ts"],
};
