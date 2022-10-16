import React from "react";

interface Props {
	checked: boolean;
	onChange?: (value: boolean) => void;
}

const Checkbox: React.FC<Props> = ({ checked, onChange }) => {
	return (
		<input
			type="checkbox"
			checked={checked}
			onChange={({ target: { checked } }) => onChange?.(checked)}
		/>
	);
};

export default Checkbox;
