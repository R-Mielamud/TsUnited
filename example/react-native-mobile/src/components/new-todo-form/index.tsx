import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {TextInput, Button, View} from 'react-native';
import {createTodoSchema, TodoCreateDto} from '~shared';
import useStyles from './styles';

interface Props {
	onSubmit?: (data: TodoCreateDto) => void;
}

const NewTodoForm: React.FC<Props> = ({onSubmit}) => {
	const [text, setText] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(false);

	const styles = useStyles();

	const todoCreateData = useMemo(() => ({text}), [text]);

	const submit = useCallback(() => {
		onSubmit?.(todoCreateData);
	}, [todoCreateData, onSubmit]);

	useEffect(() => {
		const result = createTodoSchema.validate(todoCreateData);

		setIsValid(!result.error && !result.warning);
	}, [todoCreateData]);

	return (
		<View>
			<TextInput
				multiline
				numberOfLines={3}
				textAlignVertical="top"
				style={styles.input}
				onChangeText={setText}
			/>
			<View style={styles.button}>
				<Button
					title="Save todo"
					disabled={!isValid}
					onPress={submit}
				/>
			</View>
		</View>
	);
};

export default NewTodoForm;
