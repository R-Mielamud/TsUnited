import React, { useMemo } from "react";
import { Todo as TodoType, TodoShowMode } from "~shared";
import Todo from "../todo";

interface Props {
	todos: TodoType[];
	showMode?: TodoShowMode;
	onDone?: (id: number, done: boolean) => void;
}

const TodoList: React.FC<Props> = ({
	todos,
	showMode = TodoShowMode.ALL,
	onDone,
}) => {
	const filteredTodos = useMemo(() => {
		return todos.filter((todo) => {
			switch (showMode) {
				case TodoShowMode.ONLY_UNDONE: {
					return !todo.done;
				}
				case TodoShowMode.ALL:
				default: {
					return true;
				}
			}
		});
	}, [showMode, todos]);

	const done = (id: number) => (done: boolean) => {
		onDone?.(id, done);
	};

	return (
		<ul>
			{!filteredTodos.length && "Nothing here..."}
			{filteredTodos.map((todo) => (
				<Todo key={todo.id} onDone={done(todo.id)}>
					{todo}
				</Todo>
			))}
		</ul>
	);
};

export default TodoList;
