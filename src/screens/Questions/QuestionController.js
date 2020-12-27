import React from 'react';
import {  } from 'react-native';

import apiManager from '../../data/API';
import sqlManager from '../../data/SQLite';
import QuestionView from './QuestionView';

export default class QuestionController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLock: false,
			secondes: 0,
			cat: this.props.rootProps.route.params.cat,
			level: this.props.rootProps.route.params.level,
			stateNextQuestion: ''
		};
		this.viewModel = this.props.rootProps.viewModel;
	}

	async componentDidMount() {
		var nameCat = await sqlManager.convertLabelToName("Categories", this.state.cat);
		var idLevel = await sqlManager.convertLabelToId("Levels", this.state.level);
		this.setState({
			cat: nameCat,
			level: idLevel,
		});
		console.log(this.state);
	}

	async setNewQuestion() {
		await this.props.viewModel.setQuestion(this.state.cat, this.state.level);
		this.setState({
			question: this.props.viewModel.getQuestion(),
			answer:   this.props.viewModel.getAnswer(),
			answers:  this.props.viewModel.getAnswers(),
			anecdote: this.props.viewModel.getAnecdote()
		});
	}

	nextQuestion = () => {
		// var score = this.state.score;
		// score++;
		// this.setState({ score: score });

		// var resStr = '{"api_version":"2.3","api_server":"OpenQuizzDB SRV2","api_runtime":"0.032 sec","api_key":"Y4G9375874","response_code":0,"results":[{"langue":"fr","categorie":"animaux","theme":"Colombophilie","difficulte":"débutant","question":"Quel est le mot picard bien connu pour désigner le colombophile ?","reponse_correcte":"Coulonneux","autres_choix":["Coulonneux","Colombiculteur","Péristérophile","Colombier"],"anecdote":"La colombophilie est inscrite à l\'Inventaire du patrimoine culturel immatériel français depuis 2012."}]}';
		var date = new Date();
		console.log(this.state.secondes, date.getMinutes()*60 + date.getSeconds());
		if (this.state.secondes < date.getMinutes()*60 + date.getSeconds()) { // condition d'accès à la nouvelle requête
			this.setState({ isLock: false });
			this.state.isLock = false;
		}
		if (this.state.isLock) {
			// Check de la minute pour faire la nouvelle requete API
			console.log('lock');
			this.setState({
				stateNextQuestion: "Il y a une minute d'attente entre chaque question (" + (this.state.secondes - (date.getMinutes()*60 + date.getSeconds()) + "s restantes)")
			});
		} else {
			// Engage la minute d'attente pour l'API
			this.setState({ stateNextQuestion: '' });
			this.setNewQuestion();
			this.setState({
				secondes: date.getMinutes()*60 + date.getSeconds() + 60,
				isLock: true
			});
		}
	}

	render() {
		return (
			<QuestionView nextQuestion={ this.nextQuestion } controllerState={ this.state } />
		)
	}
}