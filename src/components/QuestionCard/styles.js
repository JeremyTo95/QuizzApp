import { StyleSheet } from 'react-native';

import * as Colors from '../../assets/Colors'

const styles = new StyleSheet.create({
	container: {
		flex: 1,
		padding: 20.0,
		backgroundColor: Colors.BACKGROUND_COLOR,
		borderRadius: 20.0,
		marginVertical: 10.0,
		marginHorizontal: 10.0
	},
	header_container: {
		display: 'flex',
		flexDirection: 'row',
	},
	info_container: {

	},
	question_container: {

	},
	answers_container: {

	},
	answer_correct: {

	},
	text: {
		color: Colors.TEXT_COLOR
	}
});

export default styles;