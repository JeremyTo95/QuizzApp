import { StyleSheet } from 'react-native';

import * as Colors from '../../assets/Colors';

var styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},

	title: {
		fontSize: 38,
		fontFamily: 'Montserrat-Regular',
		letterSpacing: 5,
		fontWeight: '200',
		color: Colors.PRIMARY_COLOR,
	}
});

export default styles;