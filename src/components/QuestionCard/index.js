import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 * Question representation in card format
 * { question to show } question
 */
export default class QuestionCard extends React.Component {
	constructor(props) {
		super(props);
	}

	/**
	 * Shuffle the array
	 * @param {Array to shuffle} array 
	 */
	shuffleArray(array) {
		let curId = array.length;
		while (0 !== curId) {
			let randId = Math.floor(Math.random() * curId);
			curId -= 1;
			let tmp = array[curId];
			array[curId] = array[randId];
			array[randId] = tmp;
		}
		return array;
	}

	render() {
		const { question } = this.props;
		var tmp = JSON.parse(question['answers']);
		var answersJSON = [tmp['0'], tmp['1'], tmp['2'], tmp['3']];
		answersJSON = this.shuffleArray(answersJSON);
		return (
			<View style={ styles.container }>
				<View style={ styles.subcontainer }>
					<Text style={ styles.subtitle }>La question</Text>
					<Text style={ styles.text }>{ question['label'] }</Text>
				</View>
				<View style={ styles.subcontainer }>
					<Text style={ styles.subtitle }>Les réponses</Text>
					<View style={ styles.answers_container }>
						<Text style={ (answersJSON[0] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON[0] }</Text>
						<Text style={ (answersJSON[1] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON[1] }</Text>
						<Text style={ (answersJSON[2] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON[2] }</Text>
						<Text style={ (answersJSON[3] == question['answer']) ? styles.answer_correct : styles.answer }>{ answersJSON[3] }</Text>
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