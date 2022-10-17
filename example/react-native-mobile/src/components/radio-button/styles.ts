import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useStyles = () => {
	return useMemo(
		() =>
			StyleSheet.create({
				button: {
					width: 24,
					height: 24,
					borderWidth: 2,
					borderColor: '#212121',
					borderStyle: 'solid',
					borderRadius: 12,
					justifyContent: 'center',
					alignItems: 'center',
				},
				indicator: {
					width: 12,
					height: 12,
					backgroundColor: '#212121',
					borderRadius: 6,
				},
			}),
		[],
	);
};

export default useStyles;
