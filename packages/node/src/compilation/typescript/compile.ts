import ts from "typescript";

import {
	isParent,
	ProjectWithTsconfig,
	SUPPRESSED_DIAGNOSTICS,
} from "~/common";

import { filterDiagnostics } from "./diagnostics";

export const compileProject = (project: ProjectWithTsconfig): void => {
	console.info(`\nCompiling ${project.name}`);

	const program = ts.createProgram({
		options: project.tsconfig.options,
		rootNames: project.tsconfig.fileNames,
		configFileParsingDiagnostics: project.tsconfig.errors,
	});

	const { diagnostics, emitSkipped } = program.emit(
		undefined,
		(fileName: string, text: string, writeByteOrderMark: boolean) => {
			if (isParent(project.tsconfig.options.outDir as string, fileName)) {
				ts.sys.writeFile(fileName, text, writeByteOrderMark);
			}
		}
	);

	const allDiagnostics = filterDiagnostics(
		ts
			.getPreEmitDiagnostics(program)
			.concat(diagnostics, project.tsconfig.errors),
		project,
		SUPPRESSED_DIAGNOSTICS
	);

	if (allDiagnostics.length) {
		const formatHost: ts.FormatDiagnosticsHost = {
			getCanonicalFileName: (path) => path,
			getCurrentDirectory: ts.sys.getCurrentDirectory,
			getNewLine: () => ts.sys.newLine,
		};

		const message = ts.formatDiagnostics(allDiagnostics, formatHost);
		console.warn(message);
	}

	if (emitSkipped) {
		process.exit(1);
	}
};
