export const funcStyleRegex = new RegExp(
	`(\\b(?:import|require)\\s*\\(\\s*['"])([^"'\r\n]+)(['"]\\s*\\))`,
	"g"
);

export const statementStyleRegex = new RegExp(
	`(\\b(?:import|from|module)\\s+['"])([^"'\r\n]+)(['"])`,
	"g"
);

export const replacePaths = (
	fileContent: string,
	replacer: (importString: string) => string
) => {
	const startEndReplacer = (
		_: string,
		start: string,
		importString: string,
		end: string
	) => {
		return start + replacer(importString) + end;
	};

	return fileContent
		.replace(funcStyleRegex, startEndReplacer)
		.replace(statementStyleRegex, startEndReplacer);
};
