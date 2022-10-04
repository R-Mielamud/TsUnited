import path from "path";
import { fork } from "child_process";

const printUsage = () => {
	console.log(`Usage: tsu-node <file>

	<file>: absolute or relative path to a TS file`);
};

const main = () => {
	const file = process.argv[2];
	const registerPath = path.resolve(__dirname, "../../register");

	if (!file) {
		return printUsage();
	}

	const nodeProcess = fork(file, {
		cwd: process.cwd(),
		execArgv: ["-r", registerPath],
		stdio: ["pipe", "pipe", "pipe", "ipc"],
	});

	if (nodeProcess.stdin) {
		process.stdin.pipe(nodeProcess.stdin);
	}

	nodeProcess.stdout?.pipe(process.stdout);
	nodeProcess.stderr?.pipe(process.stderr);
};

main();
