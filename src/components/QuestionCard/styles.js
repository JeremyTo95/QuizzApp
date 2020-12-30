import { StyleSheet } from 'react-native';

import * as Colors from '../../assets/Colors'

const styles = new StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		padding: 20.0,
		backgroundColor: Colors.BACKGROUND_COLOR,
		borderRadius: 20.0,
		marginVertical: 20.0,
		marginHorizontal: 10.0
	},
	header_container: {
		display: 'flex',
		flexDirection: 'row',
		marginVertical: 5.0,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	share_btn: {
		padding: 10.0
	},
	subcontainer: {
		display: 'flex',
		flexDirection: 'column',
		marginVertical: 5.0
	},
	title: {
		fontSize: 18.0,
		fontFamily: 'Montserrat-SemiBold',
		color: Colors.PRIMARY_COLOR
	},
	subtitle: {
		fontSize: 16.0,
		fontFamily: 'Montserrat-SemiBold',
		color: Colors.TEXT_COLOR
	},
	answers_container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		marginVertical: 20.0
	},
	answer_correct: {
		color: Colors.TEXT_BTN_COLOR,
		fontFamily: 'Montserrat-Regular',
		fontSize: 14.0,
		padding: 5.0,
		paddingHorizontal: 20.0,
		borderRadius: 20.0,
		backgroundColor: Colors.BUTTON_COLOR
	},
	answer: {
		color: Colors.TEXT_COLOR,
		fontFamily: 'Montserrat-Regular',
		fontSize: 14.0,
		padding: 5.0,
		paddingHorizontal: 20.0
	},
	text: {
		color: Colors.TEXT_COLOR,
		fontFamily: 'Montserrat-Regular',
		fontSize: 14.0,
		marginTop: 10.0
	}
});

export default styles;