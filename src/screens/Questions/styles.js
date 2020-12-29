import { StyleSheet } from 'react-native';

import * as Colors from '../../assets/Colors';

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.BACKGROUND_COLOR
	},
	goBack: {
		position: 'absolute',
		paddingVertical: 40.0,
		paddingHorizontal: 15.0,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		width:100.0,
	},
	question_container: {
		marginHorizontal: 30.0,
		marginVertical: 10.0
	},
	question_content: {
		fontSize: 20.0,
		fontFamily: 'Montserrat-SemiBold',
		color: Colors.TEXT_COLOR,
		textAlign: 'center',
		paddingVertical: 10.0
	},
	answers_container: {
		paddingVertical: 30.0,
		marginHorizontal: 30.0,
		paddingHorizontal: 20.0,
		justifyContent: 'space-between'
	},
	answer: {
		fontSize: 18.0,
		fontFamily: 'Montserrat-SemiBold',
		color: Colors.TEXT_COLOR,
		marginVertical: 15.0,
		paddingVertical: 10.0,
		paddingHorizontal: 20.0,
		borderRadius: 30.0,
	},
	answerSelectorSelected: {
		width: 25.0,
		height: 25.0,
		borderRadius: 100,
		backgroundColor: Colors.PRIMARY_COLOR
	},
	answer_container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	answerSelectorFalse: {
		width: 25.0,
		height: 25.0,
		borderRadius: 100,
		backgroundColor: 'red'
	},
	answerSelectorTrue: {
		width: 25.0,
		height: 25.0,
		borderRadius: 100,
		backgroundColor: 'green'
	},
	answerSelector: {
		width: 25.0,
		height: 25.0,
	},
	answer_false: {
		fontSize: 18.0,
		fontFamily: 'Montserrat-SemiBold',
		color: 'red',
		marginVertical: 15.0,
		paddingVertical: 10.0,
		paddingHorizontal: 20.0,
		borderRadius: 30.0,
	},
	answer_correct: {
		fontSize: 18.0,
		fontFamily: 'Montserrat-SemiBold',
		color: 'green',
		marginVertical: 15.0,
		paddingVertical: 10.0,
		paddingHorizontal: 20.0,
		borderRadius: 30.0,
	},
	btn_container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20.0
	},
	anecdote_container: {
		marginHorizontal: 20.0,
		paddingVertical: 10.0
	},
	anecdote:{
		color: Colors.TEXT_COLOR,
		fontSize: 15.0,
		fontFamily: 'Montserrat-Regular'
	},
	message_container: {
		marginHorizontal: 20.0,
		paddingVertical: 10.0
	},
	message:{
		color: 'red',
		fontFamily: 'Montserrat-SemiBold'
	},
	subtitle: {
		fontSize: 18.0,
		color: Colors.TEXT_COLOR,
		fontFamily: 'Montserrat-SemiBold'
	}
});

export default styles;