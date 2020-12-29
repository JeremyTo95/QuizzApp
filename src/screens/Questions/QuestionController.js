import React from 'react';
import { Alert } from 'react-native';

import sqlManager from '../../data/SQLite';
import QuestionView from './QuestionView';

import styles from './styles';

/**
 * Question controller
 */
export default class QuestionController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLock: false, 										// verrouillage de la prochaine question
			secondes: 0,											// minute + seconde (en s) au moment du chargement de la dernière question --> utiliser pour tester le verrouillage
			cat: this.props.rootProps.route.params.cat,					// id category --> category name
			level: this.props.rootProps.route.params.level,				// id level    --> level name
			nbQuestions: this.props.rootProps.route.params.nbQuestions, 	// nombre de question paramétré
			questionNumber: 0,										// Numéro de question courant
			score: 0,												// Score actuel
			stateNextQuestion: '',									// Variable pour afficher un message sur l'état d'attente pour la prochaine question
			userAnswer: undefined,									// Réponse de l'utilisateur
			userAnswerIndex: undefined,								// Index de la réponse de l'utilisateur
			isConfirm: false,										// Vérifie que la question a été répondu pour passer à la correction de la question
			buttonLabel: "Confirmer",								// Valeur afficher sur le bouton de confirmation / passage à la prochaine question
			question: undefined,									// Question en attente de chargement avec setNewQuestion()
			answer: undefined,										// Réponse en attente de chargement avec setNewQuestion()
			answerIndex: undefined,									// Indice de la réponse en attente de chargement avec setNewQuestion()
			answers: [],											// Liste des réponses en attente de chargement avec setNewQuestion()
			anecdote: undefined,									// Anecdote en attente de chargement avec setNewQuestion()
			styleAnswerSelector1: styles.answerSelector,					// Style de l'indicateur de réponse pour la proposition 1
			styleAnswerSelector2: styles.answerSelector,					// Style de l'indicateur de réponse pour la proposition 2
			styleAnswerSelector3: styles.answerSelector,					// Style de l'indicateur de réponse pour la proposition 3
			styleAnswerSelector4: styles.answerSelector,					// Style de l'indicateur de réponse pour la proposition 4
		};
		this.viewModel = this.props.rootProps.viewModel;
	}

	/**
	 * Initialize the data
	 */
	async componentDidMount() {
		var nameCat = await this.props.viewModel.convertLabelToName("Categories", this.state.cat);
		var idLevel = await this.props.viewModel.convertLabelToId("Levels", this.state.level);
		this.setState({
			cat: nameCat,
			level: idLevel,
		});
		this.nextQuestion();
		console.log(this.state);
	}

	/**
	 * This function load question and set it in the QuestionController state
	 */
	async setNewQuestion() {
		await this.props.viewModel.setQuestion(this.state.cat, this.state.level);
		this.setState({
			question:    this.props.viewModel.getQuestion(),
			answer:      this.props.viewModel.getAnswer(),
			answerIndex: this.props.viewModel.getAnswerIndex(),
			answers:     this.props.viewModel.getAnswers(),
			anecdote:    this.props.viewModel.getAnecdote()
		});
	}

	/**
	 * Manage the question logic with :
	 * 	- timeout to request API (60s)
	 * 	- variable reset for next question
	 * 	- initialize new question  
	 */
	nextQuestion = () => {
		var date = new Date();
		// console.log(this.state.secondes, date.getMinutes()*60 + date.getSeconds());
		if (this.state.secondes < date.getMinutes()*60 + date.getSeconds()) { // condition d'accès à la nouvelle requête
			this.setState({ isLock: false });
			this.state.isLock = false;
		}
		if (this.state.isLock) {
			// Check de la minute pour faire la nouvelle requete API
			this.setState({
				stateNextQuestion: "Il y a une minute d'attente entre chaque question (" + (this.state.secondes - (date.getMinutes()*60 + date.getSeconds()) + "s restantes)"),
				buttonLabel: "Suivant"
			});
		} else {
			// Engage la minute d'attente pour l'API
			var qn = this.state.questionNumber;
			qn++;
			this.setState({ stateNextQuestion: '' });
			this.setNewQuestion();
			this.setState({
				stateNextQuestion: '',
				buttonLabel: "Confirmer",
				secondes: date.getMinutes()*60 + date.getSeconds() + 45,
				isLock: true,
				isConfirm: false,
				questionNumber: qn,
				styleAnswerSelector1: styles.answerSelector,
				styleAnswerSelector2: styles.answerSelector,
				styleAnswerSelector3: styles.answerSelector,
				styleAnswerSelector4: styles.answerSelector,
				userAnswer: undefined,
				userAnswerIndex: undefined
			});
		}
	}

	/**
	 * Update the state of selected answer and show the selector next to the answer
	 * @param {Answer Index which is about} answerIndex 
	 */
	selectAnswer = (answerIndex) => {							// OK : Fonction confirmé
		if (!this.state.isConfirm) {							// Vérifie que la question n'a pas été répondu
			this.setState({
				styleAnswerSelector1: styles.answerSelector,		// Initialisation du style de la proposition 1
				styleAnswerSelector2: styles.answerSelector,		// Initialisation du style de la proposition 2
				styleAnswerSelector3: styles.answerSelector,		// Initialisation du style de la proposition 3
				styleAnswerSelector4: styles.answerSelector,		// Initialisation du style de la proposition 4
				userAnswer: this.state.answer[answerIndex],		// Stockage de la réponse dans le state
				userAnswerIndex: answerIndex					// Stockage de l'index de la réponse dans le state
			});
			if (answerIndex == 0) this.setState({ styleAnswerSelector1: styles.answerSelectorSelected });	// Affiche le selecteur à coté la réponse 1 en témoin
			if (answerIndex == 1) this.setState({ styleAnswerSelector2: styles.answerSelectorSelected });	// Affiche le selecteur à coté la réponse 2 en témoin
			if (answerIndex == 2) this.setState({ styleAnswerSelector3: styles.answerSelectorSelected });	// Affiche le selecteur à coté la réponse 3 en témoin
			if (answerIndex == 3) this.setState({ styleAnswerSelector4: styles.answerSelectorSelected });	// Affiche le selecteur à coté la réponse 4 en témoin
		}
	}

	/**
	 * Function wich is use when the confirm button is use
	 */
	validateAnswer = () => {
		console.log(this.state.nbQuestions, this.state.questionNumber);
		if (this.state.userAnswerIndex == undefined) {											// Vérifie qu'une réponse à été donné par l'utilisateur
			this.setState({ stateNextQuestion: "Veuillez entrer une solution avant de confirmer !" })
		} else {
			if (this.state.isConfirm == false) {												// Vérifie que la question n'a pas encore été confirmé
				if (this.state.answerIndex == 0) this.setState({ styleAnswerSelector1: styles.answerSelectorTrue });	// Affiche la bonne réponse
				if (this.state.answerIndex == 1) this.setState({ styleAnswerSelector2: styles.answerSelectorTrue });	// Affiche la bonne réponse
				if (this.state.answerIndex == 2) this.setState({ styleAnswerSelector3: styles.answerSelectorTrue });	// Affiche la bonne réponse
				if (this.state.answerIndex == 3) this.setState({ styleAnswerSelector4: styles.answerSelectorTrue });	// Affiche la bonne réponse
				
				if (this.state.userAnswerIndex == this.state.answerIndex) {  						// Gestion du score
					var score = this.state.score;
					score++;
					this.setState({ score: score })
					this.state.score = score;
				}

				if (this.state.questionNumber < this.state.nbQuestions) {							// Continue while the quizz is not over
					this.setState({														// Sauvegarde de l'état de la question
						isConfirm: true,
						buttonLabel: "Suivant"
					});
				} else {																	// Terminate the quizz and set the popup result screen
					this.setState({
						isConfirm: true,
						buttonLabel: "Terminer"
					});
					Alert.alert(
						"Fin du quizz",
						"Vous avez un score de " + this.state.score + "/" + this.state.nbQuestions,
						[
							{
								text: 'Fermer', onPress: () => this.props.rootProps.navigation.pop()
							}
						],
						{ cancelable: false }
					)
				}

			} else {
				this.nextQuestion();
			}
		} 
	}

	render() {
		return (
			<QuestionView 
				selectAnswer={ this.selectAnswer }
				validateAnswer={ this.validateAnswer }
				controllerState={ this.state }
			/>
		)
	}
}