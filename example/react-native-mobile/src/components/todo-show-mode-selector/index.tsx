import React from 'react';
import {Text, View} from 'react-native';
import {TodoShowMode} from '../../../../shared/src/types';
import RadioButton from '../radio-button';
import useStyles from './styles';

interface Props {
	showMode?: TodoShowMode;
	onChange?: (mode: TodoShowMode) => void;
}

const TodoShowModeSelector: React.FC<Props> = ({
	showMode = TodoShowMode.ALL,
	onChange,
}) => {
	const styles = useStyles();

	const change = (mode: TodoShowMode) => () => {
		onChange?.(mode);
	};

	return (
		<View>
			<View style={styles.variant}>
				<RadioButton
					style={styles.button}
					checked={showMode === TodoShowMode.ALL}
					onCheck={change(TodoShowMode.ALL)}
				/>
				<Text>All todos</Text>
			</View>
			<View style={[styles.variant, styles.padded]}>
				<RadioButton
					style={styles.button}
					checked={showMode === TodoShowMode.ONLY_UNDONE}
					onCheck={change(TodoShowMode.ONLY_UNDONE)}
				/>
				<Text>Only undone todos</Text>
			</View>
		</View>
	);
};

export default TodoShowModeSelector;
