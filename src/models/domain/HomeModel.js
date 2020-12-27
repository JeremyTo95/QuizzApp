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
		this.levels      = await sqlManager.selectTable(TableNames.LEVELS);
	}

	async setQuestions() {
		this.questions   = await sqlManager.selectTable(TableNames.QUESTIONS);
	}

	async setScores() {
		this.scores      = await sqlManager.selectTable(TableNames.SCORES);
	}

	async initData() {
		await this.setCategories();
		await this.setLevels();
		await this.setQuestions();
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