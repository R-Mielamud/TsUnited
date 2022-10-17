import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useStyles = () => {
	return useMemo(
		() =>
			StyleSheet.create({
				app: {
					padding: 8,
				},
				block: {
					paddingBottom: 15,
				},
				h1: {
					fontSize: 24,
					fontWeight: 'bold',
				},
				h2: {
					fontSize: 18,
					fontWeight: 'bold',
				},
			}),
		[],
	);
};

export default useStyles;
