import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

import styles from './styles';

export default class HomeView extends React.Component {
	constructor(props) {
		super(props)
		console.log("HomeView")
	}

	render() {
		const {
			setMenuCat,
			showMenuCat,
			labelMenuCat,
			buildSelectCategories,
			setMenuLevel,
			showMenuLevel,
			labelMenuLevel,
			buildSelectLevels,
			nbQuestions,
			updateQuestionNumber,
			startQuizz,
			buildScoresHistory,
			buildQuestionsHistory
		} = this.props;

		return (
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					<Text style={ styles.title }>QuizzApp</Text>
					<View style={ styles.select_container }>
						<View style={ styles.select_row }>
							<Text>Categorie : </Text>
							<Menu 
								ref={ setMenuCat }
								button={<Text onPress={ showMenuCat }>{ labelMenuCat } </Text>}
							>
								{ buildSelectCategories() }
							</Menu>
						</View>
						<View style={ styles.select_row }>
							<Text>Niveau : </Text>
							<Menu 
								ref={ setMenuLevel }
								button={<Text onPress={ showMenuLevel }>{ labelMenuLevel } </Text>}
							>
								{ buildSelectLevels() }
							</Menu>
						</View>
						<View style={ styles.select_row }>
							<Text>Nombre de questions (1-20) : </Text>
							<TextInput 
								keyboardType="numeric"
								onChangeText={ updateQuestionNumber }
								value={ nbQuestions.toString() }
							/>
						</View>
						<Button 
							title="Commencer"
							onPress={ startQuizz }
						/>
					</View>
					<View style={ styles.history_container }>
						<View style={ styles.scores_container }>
							<Text>Les Scores</Text>
							<View>
								{ buildScoresHistory() }
							</View>
						</View>

						<View style={ styles.questions_container }>
							<Text>Les Questions</Text>
							<View>
								{ buildQuestionsHistory() }
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}