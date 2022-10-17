import 'fast-text-encoding';

import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Todo, TodoCreateDto, TodoShowMode} from '~shared';
import NewTodoForm from '../new-todo-form';
import TodoList from '../todo-list';
import TodoShowModeSelector from '../todo-show-mode-selector';
import useStyles from './styles';

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const [todoShowMode, setTodoShowMode] = useState<TodoShowMode>(
		TodoShowMode.ALL,
	);

	const styles = useStyles();

	const newTodoId = useMemo(() => {
		const lastId = todos.reduce<number>(
			(prevLastId, todo) => Math.max(prevLastId, todo.id),
			0,
		);

		return lastId + 1;
	}, [todos]);

	const addTodo = useCallback(
		(data: TodoCreateDto) => {
			setTodos(todos => [
				...todos,
				{
					id: newTodoId,
					done: false,
					text: data.text,
				},
			]);
		},
		[newTodoId],
	);

	const setDone = useCallback((id: number, done: boolean) => {
		setTodos(todos =>
			todos.map(todo => (todo.id === id ? {...todo, done} : todo)),
		);
	}, []);

	return (
		<SafeAreaView style={styles.app}>
			<View style={styles.block}>
				<Text style={styles.h1}>
					Welcome to the minimalistic Todo list
				</Text>
			</View>
			<View style={styles.block}>
				<NewTodoForm onSubmit={addTodo} />
			</View>
			<View style={styles.block}>
				<TodoShowModeSelector
					showMode={todoShowMode}
					onChange={setTodoShowMode}
				/>
			</View>
			<View style={styles.block}>
				<Text style={styles.h2}>To Do:</Text>
				<TodoList
					todos={todos}
					showMode={todoShowMode}
					onDone={setDone}
				/>
			</View>
		</SafeAreaView>
	);
};

export default App;
