import ts from "typescript";

export interface Tsconfig extends ts.ParsedCommandLine {
	path: string;
}
