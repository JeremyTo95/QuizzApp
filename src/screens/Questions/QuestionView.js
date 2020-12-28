import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';

import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import Button from '../../components/Button';

import styles from './styles';

export default class QuestionView extends React.Component {
	constructor(props) {
		super(props);
		console.log("constructor QuestionView")
	}
	
	render() {
		const {  
			controllerState,
			selectAnswer,
			validateAnswer,
		} = this.props;
		return (
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					<Title title={ "Question N°" + controllerState.questionNumber }  />
					<Subtitle subtitle={ "Score : " + controllerState.score } />
					<View style={ styles.question_container }>
						<Text style={ styles.question_content }>{ controllerState.question }</Text>
					</View>
					<View style={ styles.answers_container }>
						<TouchableOpacity onPress={ () => selectAnswer(0) } style={ styles.answer_container }>
							<View style={ controllerState.styleAnswerSelector1 } />
							<Text style={ styles.answer }>{ controllerState.answers[0] }</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={ () => selectAnswer(1) } style={ styles.answer_container }>
							<View style={ controllerState.styleAnswerSelector2 } />
							<Text style={ styles.answer }>{ controllerState.answers[1] }</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={ () => selectAnswer(2) } style={ styles.answer_container }>
							<View style={ controllerState.styleAnswerSelector3 } />
							<Text style={ styles.answer }>{ controllerState.answers[2] }</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={ () => selectAnswer(3) } style={ styles.answer_container }>
							<View style={ controllerState.styleAnswerSelector4 } />
							<Text style={ styles.answer }>{ controllerState.answers[3] }</Text>
						</TouchableOpacity>
					</View>
					<View style={ styles.btn_container }>
						<Button 
							action={ validateAnswer }
							text={ controllerState.buttonLabel }
							isRaised={ true }
						/>
					</View>
					<View style={ styles.anecdote_container }>
						<Text style={ styles.anecdote_content }>{(controllerState.isConfirm) ? controllerState.anecdote : "" }</Text>
					</View>
					<View style={ styles.message_container }>
						<Text style={ styles.message }> { controllerState.stateNextQuestion }</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}