import React              from 'react';
import HomeView           from './HomeView';

import { MenuItem }       from 'react-native-material-menu';
import { Alert }          from 'react-native';
import QuestionCard       from '../../components/QuestionCard';

import * as screen_labels from '../constants'
import      styles        from '../../components/Title/styles';

/**
 * Home controller
 */
export default class HomeController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			labelMenuCat: "Selectionner",
			labelMenuLevel: "Selectionner",
			menuCat: null,
			menuLevel: null,
			nbQuestions: 5,
			categories: [],
			levels: [],
			showAllQuestions: false,
			showAllQuestionsLabel: "Afficher plus",
		}
	}

	/**
	 * Initialization data 
	 */
	async componentDidMount() {
		await this.props.viewModel.initData();

		this.setState({
			levels:     this.props.viewModel.getLevels(),
			categories: this.props.viewModel.getCategories(),
			questions:  this.props.viewModel.getQuestions(),
		});
	}

	/**
	 * Define the reference category menu for dropdown
	 * @param { Ref menu } ref 
	 */
	setMenuCat = ref => { 
		this.setState({ menuCat: ref }) 
	};
	
	/**
	 * Hide category menu 
	 * @param {new label value} value 
	 */
	hideMenuCat = (value) => {
		this.setState({ labelMenuCat: value, })
		this.state.menuCat.hide();
	};

	/**
	 * Show category menu
	 */
	showMenuCat = () => { 
		this.state.menuCat.show(); 
	};

	/**
	 * Define the reference level menu
	 * @param {Ref menu} ref 
	 */
	setMenuLevel = ref => { 
		this.setState({ menuLevel: ref }) 
	};

	/**
	 * Hide the level menu
	 * @param {new label value} value 
	 */
	hideMenuLevel = (value) => {
		this.setState({ labelMenuLevel: value, })
		this.state.menuLevel.hide();
	};

	/**
	 * Show level menu
	 */
	showMenuLevel = () => { 
		this.state.menuLevel.show(); 
	};

	/**
	 * Build select categories options for dropdown menu
	 */
	buildSelectCategories = () => {
		if (this.state.categories != null) {
			return (
				this.state.categories.map(item => {
					return (
						<MenuItem 
							key={ item['id'] } 
							onPress={ () => this.hideMenuCat(item['label']) } 
						>
							{ item['label'] }
						</MenuItem>
					)
				})
			)
		} else {
			console.error("NULL CATEGORIES");
		}
	}

	/**
	 * Build select levels options for dropdown menu
	 */
	buildSelectLevels = () => {
		if (this.state.levels != null) {
			return (
				this.state.levels.map(item => {
					return (
						<MenuItem 
							key={ item['id'] } 
							onPress={ () => this.hideMenuLevel(item['label']) }
							style={ styles.text }
						>
							{ item['label'] }
						</MenuItem>
					)
				})
			)
		} else {
			console.error("NULL LEVELS");
		}
	}

	/**
	 * Update the question number
	 * @param {new question number} value 
	 */
	updateQuestionNumber = (value) => {
		if (value/100 < 1) {
			if (value != "") this.setState({ nbQuestions: parseInt(value) });
			else             this.setState({ nbQuestions: "" });
		}
	}

	/**
	 * Build question history
	 */
	buildQuestionsHistory = () => {
		var cpt = 0;
		if (this.state.questions != null) {
			return (
				this.state.questions.map(item => {
					cpt++;
					if (this.state.showAllQuestions == true || cpt <= 5) {
						return (
							<QuestionCard 
								key={ item['id'] } 
								question={ item } 
							/>
						);
					}
				})
			);
		}
	}

	/**
	 * Refresh questions data : async function use by the refreshQuestionHistoric
	 */
	async refreshQuestionsHistoricAsync() {
		await this.props.viewModel.initData();

		this.setState({
			levels:     this.props.viewModel.getLevels(),
			categories: this.props.viewModel.getCategories(),
			questions:  this.props.viewModel.getQuestions(),
		});
	}

	/**
	 * Refresh question data : use by the view button
	 */
	refreshQuestionsHistoric = () => {
		this.refreshQuestionsHistoricAsync();
	}


	/**
	 * Delete questions data : async function use by the deleteQuestionHistory
	 */
	async deleteQuestionsHistoryAsync() {
		await this.props.viewModel.deleteQuestionsHistory();
	}

	/**
	 * Delete question data : use by the long press view button
	 */
	async deleteQuestionsHistory() {
		this.deleteQuestionsHistoryAsync();
		this.refreshQuestionsHistoric();
	}

	deleteHistory = () => {
		return (
			Alert.alert(
				"Attention : Demande de suppression des données",
				"Vous avez appuyer longtemps sur le bouton actualiser. Cela à pour effet la demande de suppression des données",
				[
					{
						text: "Annuler",   onPress: () => console.log("Annuler")
					},
					{
						text: 'Confirmer', onPress: () => this.deleteQuestionsHistory()
					}
				],
				{ cancelable: false }
			)
		)
	}

	/**
	 * Start quizz (check also that the configuration is correct)
	 */
	startQuizz = () => {
		if (this.state.nbQuestions >= 1 && this.state.nbQuestions <= 10 && this.state.labelMenuCat != "Selectionner" && this.state.labelMenuLevel != "Selectionner") {
			this.props.nav.navigate(screen_labels.QUESTION, { cat: this.state.labelMenuCat, level: this.state.labelMenuLevel, nbQuestions: this.state.nbQuestions })
		} else {
			return (
				Alert.alert(
					"Erreur de saisie",
					"Veuillez entrer les bonnes valeurs pour commencer le quizz",
					[
						{
							text: 'Fermer', onPress: () => console.log("popup fermer")
						}
					],
					{ cancelable: false }
				)
			);
		}
	}

	/**
	 * Manage the show more / less questions button
	 */
	showAllQuestions = () => {
		var questionState = this.state.showAllQuestions;
		this.setState({
			showAllQuestions:       !questionState,
			showAllQuestionsLabel: (!questionState) ? "Afficher moins" : "Afficher plus"
		});
	}

	render() {
		return (
			<HomeView
				setMenuCat=              { this.setMenuCat                  }
				showMenuCat=             { this.showMenuCat                 }
				hideMenuCat=             { this.hideMenuCat                 }
				labelMenuCat=            { this.state.labelMenuCat          }
				buildSelectCategories=   { this.buildSelectCategories       }
				setMenuLevel=            { this.setMenuLevel                }
				showMenuLevel=           { this.showMenuLevel               }
				hideMenuLevel=           { this.hideMenuLevel               }
				labelMenuLevel=          { this.state.labelMenuLevel        }
				buildSelectLevels=       { this.buildSelectLevels           }
				nbQuestions=             { this.state.nbQuestions           }
				updateQuestionNumber=    { this.updateQuestionNumber        }
				startQuizz=              { this.startQuizz                  }
				buildQuestionsHistory=   { this.buildQuestionsHistory       }
				showAllQuestions=        { this.showAllQuestions            }
				showAllQuestionsLabel=   { this.state.showAllQuestionsLabel }
				refreshQuestionsHistoric={ this.refreshQuestionsHistoric    }
				deleteHistory=           { this.deleteHistory               }
			/>
		)
	}
}