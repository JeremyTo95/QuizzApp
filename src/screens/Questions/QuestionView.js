import React from 'react';
import { View, Text, Button} from 'react-native';

export default class QuestionView extends React.Component {
	constructor(props) {
		super(props);
		console.log("constructor QuestionView")
	}
	
	render() {
		const { nextQuestion, controllerState } = this.props;
		return (
			<View>
				<Text>score : 0 </Text>
				<Text>Question : { controllerState.question }</Text>
				<Text>Answer   : { controllerState.answer   }</Text>
				<Text>Answers  : { controllerState.answers  }</Text>
				<Text>Anecdote : { controllerState.anecdote }</Text>
				<Button onPress={ nextQuestion } title="Prochaine Question" />
				<Text>{ controllerState.stateNextQuestion }</Text>
			</View>
		);
	}
}