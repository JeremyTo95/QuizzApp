import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import Button from '../../components/Button';

import * as Colors from '../../assets/Colors';
import styles from './styles';

/**
 * Home View
 * @constructor
 * @param { Function } setMenuCat               - Function to set category menu
 * @param { Function } showMenuCat              - Function to show category menu
 * @param { string   } labelMenuCat             - Label of category dropdown
 * @param { Function } buildSelectCategories    - Function to build category menu
 * @param { Function } setMenuLevel             - Function to set level menu
 * @param { Function } showMenuLevel            - Function to show level menu
 * @param { string   } labelMenuLevel           - Label of level dropdown menu
 * @param { Function } buildSelectLevels        - Function to build level menu
 * @param { Integer  } nbQuestions              - Number of questions
 * @param { Function } updateQuestionNumber     - Function to update number of questions
 * @param { Function } startQuizz               - Function to start the quizz
 * @param { Function } buildQuestionsHistory    - Function to build the question history (show only 5 at the begining)
 * @param { Function } showAllQuestions         - Function to show all questions
 * @param { string   } showAllQuestionsLabel    - Label of showw all button
 * @param { Function } refreshQuestionsHistoric - Function to refresh question data to make history
 * @param { Function } deleteHistory            - Function to delete the question history
 * 
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
			buildQuestionsHistory,
			showAllQuestions,
			showAllQuestionsLabel,
			refreshQuestionsHistoric,
			deleteHistory
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
									onChangeText={ updateQuestionNumber   }
									value=       { nbQuestions.toString() }
									style=       { styles.text            }
								/>
							</View>
						</View>
						<View style={ styles.btn_container }>
							<Button 
								text=    "Commencer"
								action=  { startQuizz }
								isRaised={ true       }
							/>
						</View>
					</View>
					<View style={ styles.history_container }>
						<View style={ styles.questions_container }>
							<View style={ styles.header_container }>
								<Subtitle subtitle="Historique des questions" isCenter={ false } />
								<TouchableOpacity style={ styles.refresh_btn } onLongPress={ deleteHistory } onPress={ refreshQuestionsHistoric } >
									<Ionicons name='refresh-outline' size={40} color={ Colors.TEXT_COLOR } />
								</TouchableOpacity>
							</View>
							<View>
								{ buildQuestionsHistory() }
								<Button 
									text=  { showAllQuestionsLabel } 
									action={ showAllQuestions      } 
									isFlat={ true                  }
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}