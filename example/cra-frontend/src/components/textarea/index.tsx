import React from "react";
import styles from "./textarea.module.scss";

interface Props {
	value: string;
	onChange?: (value: string) => void;
}

const Textarea: React.FC<Props> = ({ value, onChange }) => {
	return (
		<textarea
			value={value}
			onChange={({ target: { value } }) => onChange?.(value)}
			className={styles.textarea}
		/>
	);
};

export default Textarea;
