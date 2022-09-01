import ts from "typescript";

import { isParent, Project } from "~/common";

export const filterDiagnostics = (
	diagnostics: ts.Diagnostic[],
	project: Project,
	suppress: number[]
): ts.Diagnostic[] => {
	return diagnostics
		.filter((diagnostic) =>
			diagnostic.file
				? isParent(project.path, diagnostic.file.fileName)
				: true
		)
		.filter((diagnostic) => !suppress.includes(diagnostic.code));
};
