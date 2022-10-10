import { Tsconfig } from "~/common";

export interface Matcher {
	match: (request: string) => string | undefined;
	tsconfig: Tsconfig;
}
