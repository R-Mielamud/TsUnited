import React from 'react';
import {View, Text, StyleProp, ViewStyle} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Todo as TodoType} from '~shared';
import useStyles from './styles';

interface Props {
	style?: StyleProp<ViewStyle>;
	onDone?: (done: boolean) => void;
	children: TodoType;
}

const Todo: React.FC<Props> = ({style, onDone, children: {done, text}}) => {
	const styles = useStyles();

	return (
		<View style={[style, styles.container]}>
			<CheckBox
				value={done}
				onValueChange={onDone}
				style={styles.checkbox}
			/>
			<Text>{text}</Text>
		</View>
	);
};

export default Todo;
