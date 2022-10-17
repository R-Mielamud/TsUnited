import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

const useStyles = () => {
	return useMemo(
		() =>
			StyleSheet.create({
				container: {
					flexDirection: 'row',
					alignItems: 'center',
				},
				checkbox: {
					marginRight: 5,
				},
			}),
		[],
	);
};

export default useStyles;
