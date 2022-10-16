import React, { useCallback, useMemo, useState } from "react";
import { Todo, TodoCreateDto, TodoShowMode } from "~shared";
import NewTodoForm from "../new-todo-form";
import TodoShowModeSelector from "../todo-show-mode-selector";
import TodoList from "../todo-list";
import styles from "./app.module.scss";

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const [todoShowMode, setTodoShowMode] = useState<TodoShowMode>(
		TodoShowMode.ALL
	);

	const newTodoId = useMemo(() => {
		const lastId = todos.reduce<number>(
			(prevLastId, todo) => Math.max(prevLastId, todo.id),
			0
		);

		return lastId + 1;
	}, [todos]);

	const addTodo = useCallback(
		(todo: TodoCreateDto) => {
			setTodos((todos) => [
				...todos,
				{
					id: newTodoId,
					done: false,
					text: todo.text,
				},
			]);
		},
		[newTodoId]
	);

	const setDone = useCallback((id: number, done: boolean) => {
		setTodos((todos) =>
			todos.map((todo) => (todo.id === id ? { ...todo, done } : todo))
		);
	}, []);

	return (
		<div className={styles.app}>
			<h1>Welcome to the minimalistic Todo list</h1>
			<NewTodoForm onSubmit={addTodo} />
			<TodoShowModeSelector
				value={todoShowMode}
				onChange={setTodoShowMode}
			/>
			<h2>To Do:</h2>
			<TodoList todos={todos} showMode={todoShowMode} onDone={setDone} />
		</div>
	);
};

export default App;
