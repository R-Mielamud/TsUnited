import React, {useCallback} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import useStyles from './styles';

interface Props {
	style?: StyleProp<ViewStyle>;
	checked?: boolean;
	onCheck?: () => void;
}

const RadioButton: React.FC<Props> = ({style, checked = false, onCheck}) => {
	const styles = useStyles();

	const check = useCallback(() => {
		if (!checked) {
			onCheck?.();
		}
	}, [checked]);

	return (
		<TouchableOpacity style={[style, styles.button]} onPress={check}>
			{checked && <View style={styles.indicator} />}
		</TouchableOpacity>
	);
};

export default RadioButton;
