import { StyleSheet } from 'react-native';

import * as Colors from '../../assets/Colors';

const styles = new StyleSheet.create({
	container: {
		borderRadius: 20.0,
		paddingHorizontal: 50.0,
		paddingVertical: 10.0
	},
	flat: {
		fontSize: 16.0,
		fontFamily: "Montserrat-Regular",
		color: Colors.TEXT_BTN_COLOR,
		textAlign: 'center'
	},
	raised: {
		backgroundColor: Colors.BUTTON_COLOR,
		fontFamily: "Montserrat-Regular",
		fontSize: 16.0,
		color: Colors.TEXT_BTN_COLOR,
		textAlign: 'center'
	},
	text: {
		fontFamily: "Montserrat-Regular",
		fontSize: 16.0,
		color: Colors.TEXT_BTN_COLOR,
		textAlign: 'center'
	}
});

export default styles;