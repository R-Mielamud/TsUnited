import { compile } from "../compilation";

const main = async () => {
	const trimmedArgs = process.argv.map((arg) => arg.trim());

	const options = {
		noMergedPackageJson: trimmedArgs.some((arg) =>
			["--no-merged-package-json", "--noMergedPackageJson"].includes(arg)
		),
	};

	compile(options);
};

main();
