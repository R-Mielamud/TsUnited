import { Tsconfig } from "~/common";

export interface Matcher {
	match: (request: string) => Promise<string | undefined>;
	tsconfig: Tsconfig;
}
