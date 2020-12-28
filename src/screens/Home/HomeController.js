import React from 'react';
import HomeView from './HomeView';

import Menu, { MenuItem } from 'react-native-material-menu';
import { Alert, Text } from 'react-native';
import QuestionCard from '../../components/QuestionCard';
import Button from '../../components/Button';

import * as screen_labels from '../constants'
import * as tableNames from '../../data/SQLite/constants';
import styles from '../../components/Title/styles';

export default class HomeController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			labelMenuCat: "Animaux",
			labelMenuLevel: "Débutant",
			menuCat: null,
			menuLevel: null,
			nbQuestions: 5,
			categories: [],
			levels: [],
			showAllQuestions: false,
			showAllQuestionsLabel: "Afficher plus",
			showAllScores: false,
			showAllScoresLabel: "Afficher plus"
		}
	}

	async componentDidMount() {
		console.log("componentDisMount()");
		await this.props.viewModel.initData();
		this.setState({
			levels:  this.props.viewModel.getLevels(),
			categories: this.props.viewModel.getCategories(),
			questions: this.props.viewModel.getQuestions(),
			scores: this.props.viewModel.getScores()
		});
	}

	componentDidUpdate() {
		console.log("update");
	}

	componentDidCatch() {
		console.log("catch");
	}

	setMenuCat = ref => { this.setState({ menuCat: ref }) };
	hideMenuCat = (value) => {
		this.setState({ labelMenuCat: value, })
		this.state.menuCat.hide();
	};
	showMenuCat = () => { this.state.menuCat.show(); };

	setMenuLevel = ref => { this.setState({ menuLevel: ref }) };
	hideMenuLevel = (value) => {
		this.setState({ labelMenuLevel: value, })
		this.state.menuLevel.hide();
	};
	showMenuLevel = () => { this.state.menuLevel.show(); };

	buildSelectCategories = () => {
		if (this.state.categories != null) {
			return (
				this.state.categories.map(item => {
					return (
						<MenuItem key={ item['id'] } onPress={ () => this.hideMenuCat(item['label']) }>{ item['label'] }</MenuItem>
					)
				})
			)
		} else {
			console.log("NULL CATS");
		}
	}

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
			console.log("NULL LEVELS");
		}
	}

	updateQuestionNumber = (value) => {
		console.log(value/100);
		if (value/100 < 1) {
			if (value != "") this.setState({ nbQuestions: parseInt(value) });
			else this.setState({ nbQuestions: "" });
		}
	}

	buildScoresHistory = () => {
		var cpt = 0;
		if (this.state.scores != null) {
			return (
				this.state.scores.map(item => {
					cpt++;
					if (this.state.showAllScores == true || cpt <= 5)
						return (<Text key={ item['id'] }>{ item['label'] }</Text>);
				})	
			);
		}
	}

	buildQuestionsHistory = () => {
		var cpt = 0;
		if (this.state.questions != null) {
			return (
				this.state.questions.map(item => {
					cpt++;
					if (this.state.showAllQuestions == true || cpt <= 5)
						return (<QuestionCard key={ item['id'] } question={ item } />);
				})
			);
		}
	}

	startQuizz = () => {
		if (this.state.nbQuestions >= 1 && this.state.nbQuestions <= 10 && this.state.labelMenuCat != "Selectionner" && this.state.labelMenuLevel != "Selectionner") {
			this.props.nav.navigate(screen_labels.QUESTION, { cat: this.state.labelMenuCat, level: this.state.labelMenuLevel })
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

	showAllScores = () => {
		var scoreState = this.state.showAllScores;
		this.setState({
			showAllScores: !scoreState,
			showAllScoresLabel: (!scoreState) ? "Afficher moins" : "Afficher plus"
		});
	}

	showAllQuestions = () => {
		var questionState = this.state.showAllQuestions;
		this.setState({
			showAllQuestions: !questionState,
			showAllQuestionsLabel: (!questionState) ? "Afficher moins" : "Afficher plus"
		});
	}

	render() {
		return (
			<HomeView
				setMenuCat={ this.setMenuCat }
				showMenuCat={ this.showMenuCat }
				hideMenuCat={ this.hideMenuCat }
				labelMenuCat={ this.state.labelMenuCat }
				buildSelectCategories={ this.buildSelectCategories }
				setMenuLevel={ this.setMenuLevel }
				showMenuLevel={ this.showMenuLevel }
				hideMenuLevel={ this.hideMenuLevel }
				labelMenuLevel={ this.state.labelMenuLevel }
				buildSelectLevels={ this.buildSelectLevels }
				nbQuestions={ this.state.nbQuestions }
				updateQuestionNumber={ this.updateQuestionNumber }
				startQuizz={ this.startQuizz }
				buildScoresHistory={ this.buildScoresHistory }
				buildQuestionsHistory={ this.buildQuestionsHistory }
				showAllScores={ this.showAllScores }
				showAllScoresLabel={ this.state.showAllScoresLabel }
				showAllQuestions={ this.showAllQuestions }
				showAllQuestionsLabel={ this.state.showAllQuestionsLabel }
			/>
		)
	}
}