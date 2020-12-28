import { StyleSheet } from 'react-native';

import * as Colors from '../../assets/Colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 25,
		marginStart: 20
	},

	title: {
		fontSize: 25,
		fontFamily: 'Montserrat-Light',
		letterSpacing: 1,
		fontWeight: 'normal',
		color: Colors.TEXT_COLOR
	}
});

export default styles;