import { observable, action } from 'mobx';
import apiManager from '../../data/API';
import sqlManager from '../../data/SQLite'
import * as TableNames from '../../data/SQLite/constants';

export default class QuestionModel {
	@observable question = undefined;
	@observable answer   = undefined;
	@observable answers  = [];
	@observable score    = 0;
	@observable anecdote = undefined;


	async setQuestion(cat, level, answers = 4, anec = 1) {
		var response     = await apiManager.GetQuery(cat, level, answers, anec);
		var responseJSON = JSON.parse(response);
		this.question    = responseJSON['results'][0]['question'];
		this.answer      = responseJSON['results'][0]['reponse_correcte'];
		this.answers     = responseJSON['results'][0]['autres_choix'];
		this.anecdote    = responseJSON['results'][0]['anecdote'];
		sqlManager.insertQuestion(response);
	}

	getQuestion() {
		return this.question;
	}

	getAnswer() {
		return this.answer;
	}

	getAnswers() {
		return this.answers;
	}

	getScore() {
		return this.score;
	}

	setScore(newScore) {
		this.score = newScore;
	}

	increaseScore() {
		var score = this.score;
		this.score = score + 1;
	}

	getAnecdote() {
		return this.anecdote;
	}
}