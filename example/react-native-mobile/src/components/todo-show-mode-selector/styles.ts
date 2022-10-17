import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useStyles = () => {
	return useMemo(
		() =>
			StyleSheet.create({
				variant: {
					flexDirection: 'row',
					alignItems: 'center',
				},
				padded: {
					paddingTop: 5,
				},
				button: {
					marginRight: 5,
				},
			}),
		[],
	);
};

export default useStyles;
