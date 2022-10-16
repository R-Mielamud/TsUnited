import React, { useState, useCallback, useMemo, useEffect } from "react";
import { createTodoSchema, TodoCreateDto } from "~shared";
import Textarea from "../textarea";
import styles from "./new-todo-form.module.scss";

interface Props {
	onSubmit?: (data: TodoCreateDto) => void;
}

const NewTodoForm: React.FC<Props> = ({ onSubmit }) => {
	const [text, setText] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);

	const todoCreateData = useMemo(() => ({ text }), [text]);

	const submit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			onSubmit?.(todoCreateData);
		},
		[todoCreateData, onSubmit]
	);

	useEffect(() => {
		const result = createTodoSchema.validate(todoCreateData);

		setIsValid(!result.error && !result.warning);
	}, [todoCreateData]);

	return (
		<form onSubmit={submit} className={styles.newTodoForm}>
			<Textarea value={text} onChange={setText} />
			<button type="submit" disabled={!isValid}>
				Save todo
			</button>
		</form>
	);
};

export default NewTodoForm;
