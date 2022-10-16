import React from "react";
import { Todo as TodoType } from "~shared";
import Checkbox from "../checkbox";

interface Props {
	onDone?: (done: boolean) => void;
	children: TodoType;
}

const Todo: React.FC<Props> = ({ onDone, children: { text, done } }) => {
	return (
		<li>
			<Checkbox checked={done} onChange={onDone} />
			<span>{text}</span>
		</li>
	);
};

export default Todo;
