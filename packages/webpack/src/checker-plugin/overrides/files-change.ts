import { Compiler } from "webpack";

import {
	getFilesChange,
	FilesChange,
} from "fork-ts-checker-webpack-plugin/lib/files-change";

export function consumeFilesChange(compiler: Compiler): FilesChange {
	// We don't wanna erase the changes here
	return getFilesChange(compiler);
}
