export interface TodoCreateDto {
	text: string;
}

export interface TodoMarkAsDoneDto {
	done: boolean;
}

export interface TodoIdDto {
	id: number;
}

export interface TodoFilter {
	onlyUndone: "true" | "false";
}

export interface Todo {
	id: number;
	done: boolean;
	text: string;
}
