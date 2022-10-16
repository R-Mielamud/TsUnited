import React from "react";
import { TodoShowMode } from "~shared";

interface Props {
	value?: TodoShowMode;
	onChange?: (value: TodoShowMode) => void;
}

const TodoShowModeSelector: React.FC<Props> = ({
	value = TodoShowMode.ALL,
	onChange,
}) => {
	const change =
		(mode: TodoShowMode) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (!event.target.checked) {
				return;
			}

			onChange?.(mode);
		};

	return (
		<div>
			<input
				type="radio"
				checked={value === TodoShowMode.ALL}
				onChange={change(TodoShowMode.ALL)}
			/>
			<label>All todos</label>
			<input
				type="radio"
				checked={value === TodoShowMode.ONLY_UNDONE}
				onChange={change(TodoShowMode.ONLY_UNDONE)}
			/>
			<label>Only undone todos</label>
		</div>
	);
};

export default TodoShowModeSelector;
