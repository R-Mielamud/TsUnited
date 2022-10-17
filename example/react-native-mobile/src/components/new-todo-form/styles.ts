import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useStyles = () => {
	return useMemo(
		() =>
			StyleSheet.create({
				input: {
					borderWidth: 2,
					borderColor: '#212121',
					borderRadius: 5,
				},
				button: {
					paddingTop: 10,
				},
			}),
		[],
	);
};

export default useStyles;
