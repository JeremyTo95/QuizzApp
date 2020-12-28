import { observable, action } from 'mobx';
import sqlManager from '../../data/SQLite'
import * as TableNames from '../../data/SQLite/constants';

export default class HomeModel {
	@observable categories  = [];
	@observable levels      = [];
	@observable questions   = [];
	@observable scores      = [];

	async setCategories() {
		this.categories  = await sqlManager.selectTable(TableNames.CATEGORIES);
	}

	async setLevels() {
		this.levels = await sqlManager.selectTable(TableNames.LEVELS);
	}

	async setQuestions() {
		this.questions = await sqlManager.selectTable(TableNames.QUESTIONS);
		
		for (let i = 0; i < this.questions.length; i++) {
			var category = await sqlManager.convertIdToLabel(TableNames.CATEGORIES, this.questions[i]['idCategory']);
			var level    = await sqlManager.convertIdToLabel(TableNames.LEVELS, this.questions[i]['idLevel']);
			this.questions[i]['category'] = category;
			this.questions[i]['level']    = level;
		}
	}

	async convertIdToLabel(tableName, id) {
		var res = await sqlManager.convertIdToLabel(tableName, id);
		return res;
	}

	async setScores() {
		this.scores = await sqlManager.selectTable(TableNames.SCORES);
	}

	async initData() {
		await this.setCategories();
		await this.setLevels();
		await this.setQuestions();
		await this.setScores();
	}

	getCategories() {
		return this.categories;
	}

	getLevels() {
		return this.levels;
	}

	getNbQuestions() {
		return this.nbQuestions;
	}

	getQuestions() {
		return this.questions;
	}

	getScores() {
		return this.scores;
	}
}