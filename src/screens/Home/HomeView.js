import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import Button from '../../components/Button';

import * as Colors from '../../assets/Colors';
import styles from './styles';

/**
 * Home View
 */
export default class HomeView extends React.Component {
	constructor(props) {
		super(props)
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
			buildQuestionsHistory,
			showAllScores,
			showAllScoresLabel,
			showAllQuestions,
			showAllQuestionsLabel
		} = this.props;

		return (
			<SafeAreaView style={ styles.container }>
				<ScrollView>
					<Title  title="QuizzApp" />
					<View style={ Object.assign({}, styles.select_container) }>
						<View>
							<View style={ styles.select_row }>
								<Text style={ styles.text_cat }>Categorie : </Text>
								<Menu 
									ref={ setMenuCat }
									button={
										<View style={ styles.select_option }>
											<Text onPress={ showMenuCat } style={ styles.text }>{ labelMenuCat } </Text>
											<Ionicons name={'chevron-down-outline'} size={20} color={ Colors.TEXT_COLOR } />
										</View>
									}
								>
									{ buildSelectCategories() }
								</Menu>
							</View>
							<View style={ styles.select_row }>
								<Text style={ styles.text_cat }>Niveau : </Text>
								<Menu 
									ref={ setMenuLevel }
									button={
										<View style={ styles.select_option }>
											<Text onPress={ showMenuLevel } style={ styles.text }>{ labelMenuLevel } </Text>
											<Ionicons name={'chevron-down-outline'} size={20} color={ Colors.TEXT_COLOR } />
										</View>
									}
								>
									{ buildSelectLevels() }
								</Menu>
							</View>
							<View style={ styles.select_row }>
								<Text style={ styles.text_cat }>Questions (entre 1 et 10) : </Text>
								<TextInput 
									keyboardType="numeric"
									onChangeText={ updateQuestionNumber }
									value={ nbQuestions.toString() }
									style={ styles.text }
								/>
							</View>
						</View>
						<View style={ styles.btn_container }>
							<Button 
								text="Commencer"
								action={ startQuizz }
								isRaised={ true }
							/>
						</View>
					</View>
					<View style={ styles.history_container }>
						<View style={ styles.scores_container }>
							<Subtitle subtitle="Les Scores" />
							<View>
								{ buildScoresHistory() }
								<Button 
									text={ showAllScoresLabel } 
									action={ showAllScores } 
									isFlat={ true }
								/>
							</View>
						</View>

						<View style={ styles.questions_container }>
							<Subtitle subtitle="Les Questions" />
							<View>
								{ buildQuestionsHistory() }
								<Button 
									text={ showAllQuestionsLabel } 
									action={ showAllQuestions } 
									isFlat={ true }
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}