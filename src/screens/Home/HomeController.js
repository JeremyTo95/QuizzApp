import React from 'react';
import HomeView from './HomeView';

import Menu, { MenuItem } from 'react-native-material-menu';
import { Text } from 'react-native';
import * as screen_labels from '../constants'

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
			levels: []
		}
	}

	async componentDidMount() {
		await this.props.viewModel.initData()
		this.setState({
			levels:  this.props.viewModel.getLevels(),
			categories: this.props.viewModel.getCategories(),
			questions: this.props.viewModel.getQuestions(),
			scores: this.props.viewModel.getScores()
		});
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
					// console.log(item);
					return (
						<MenuItem key={ item['id'] } onPress={ () => this.hideMenuLevel(item['label']) }>{ item['label'] }</MenuItem>
					)
				})
			)
		} else {
			console.log("NULL LEVELS");
		}
	}

	updateQuestionNumber = (value) => {
		this.setState({
			nbQuestions: parseInt(value)
		})
	}

	buildScoresHistory = () => {
		if (this.state.scores != null) {
			return (
				this.state.scores.map(item => {
					console.log(item['label'])
					return (
						<Text key={ item['id'] }>{ item['label'] }</Text>
					)
				})
			)
		}
	}

	buildQuestionsHistory = () => {
		if (this.state.questions != null) {
			return (
				this.state.questions.map(item => {
					console.log(item['label'])
					return (
						<Text key={ item['id'] }>{ item['label'] }</Text>
					)
				})
			)
		}
	}

	startQuizz = () => {
		this.props.nav.navigate(screen_labels.QUESTION, { cat: this.state.labelMenuCat, level: this.state.labelMenuLevel })
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
			/>
		)
	}
}