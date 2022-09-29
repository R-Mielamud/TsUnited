import { Resolver } from "webpack";

export interface BaseResolveRequest {
	path: string;
	descriptionFilePath?: string;
	descriptionFileRoot?: string;
	descriptionFileData?: object;
	relativePath?: string;
	ignoreSymlinks?: boolean;
	fullySpecified?: boolean;
}

export interface ParsedIdentifier {
	request: string;
	query: string;
	fragment: string;
	directory: boolean;
	module: boolean;
	file: boolean;
	internal: boolean;
}

export interface WriteOnlySet<T> {
	add: (item?: T) => void;
}

export interface ResolveContext {
	contextDependencies?: WriteOnlySet<string>;
	fileDependencies?: WriteOnlySet<string>;
	missingDependencies?: WriteOnlySet<string>;
	stack?: Set<string>;
	log?: (message: string) => void;
	yield?: (req: ResolveRequest) => void;
}

export type Hook = ReturnType<Resolver["getHook"]>;
export type ResolveRequest = BaseResolveRequest & Partial<ParsedIdentifier>;
