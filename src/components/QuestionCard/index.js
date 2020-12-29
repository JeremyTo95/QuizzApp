import React          from 'react';
import { View, Text } from 'react-native';

import styles         from './styles';

/**
 * Question representation in card format
 * { question to show } question
 */
export default class QuestionCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { question } = this.props;
		var   answersJSON  = JSON.parse(question['answers']);
		return (
			<View style={ styles.container }>
				<View style={ styles.subcontainer }>
					<Text style={ styles.title }>{ question['category'] + " : " + question['level'] }</Text>
				</View>
				<View style={ styles.subcontainer }>
					<Text style={ styles.subtitle }>La question</Text>
					<Text style={ styles.text }>{ question['label'] }</Text>
				</View>
				<View style={ styles.subcontainer }>
					<Text style={ styles.subtitle }>Les réponses</Text>
					<View style={ styles.answers_container }>
						<Text style={ (answersJSON['0'] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON['0'] }</Text>
						<Text style={ (answersJSON['1'] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON['1'] }</Text>
						<Text style={ (answersJSON['2'] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON['2'] }</Text>
						<Text style={ (answersJSON['3'] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON['3'] }</Text>
					</View>
				</View>
				<View style={ styles.subcontainer }>
					<Text style={ styles.subtitle }>L'anecdote</Text>
					<Text style={ styles.text }>{ question['anecdote'] }</Text>
				</View>
			</View>
		);
	}
}