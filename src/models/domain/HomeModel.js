import { observable, action } from 'mobx';
import sqlManager from '../../data/SQLite'
import * as TableNames from '../../data/SQLite/constants';

/**
 * Home Model
 */
export default class HomeModel {
	@observable categories  = [];
	@observable levels      = [];
	@observable questions   = [];
	@observable scores      = [];

	/**
	 * Setup categories
	 */
	async setCategories() {
		this.categories  = await sqlManager.selectTable(TableNames.CATEGORIES);
	}

	/**
	 * Setup levels
	 */
	async setLevels() {
		this.levels = await sqlManager.selectTable(TableNames.LEVELS);
	}

	/**
	 * Setup questions
	 */
	async setQuestions() {
		this.questions = await sqlManager.selectTable(TableNames.QUESTIONS);
		
		for (let i = 0; i < this.questions.length; i++) {
			var category = await sqlManager.convertIdToLabel(TableNames.CATEGORIES, this.questions[i]['idCategory']);
			var level    = await sqlManager.convertIdToLabel(TableNames.LEVELS, this.questions[i]['idLevel']);
			this.questions[i]['category'] = category;
			this.questions[i]['level']    = level;
		}
	}

	/**
	 * Convert the id into label
	 * @param {Table name where we want to get data} tableName 
	 * @param {Identifier which match with the label} id 
	 */
	async convertIdToLabel(tableName, id) {
		var res = await sqlManager.convertIdToLabel(tableName, id);
		return res;
	}

	/**
	 * Setup scores
	 */
	async setScores() {
		this.scores = await sqlManager.selectTable(TableNames.SCORES);
	}

	/**
	 * Initialize the data
	 */
	async initData() {
		await this.setCategories();
		await this.setLevels();
		await this.setQuestions();
		await this.setScores();
	}

	/**
	 * Get categories
	 */
	getCategories() {
		return this.categories;
	}

	/**
	 * Get levels
	 */
	getLevels() {
		return this.levels;
	}

	/**
	 * Get questions count
	 */
	getNbQuestions() {
		return this.nbQuestions;
	}

	/**
	 * Get questions
	 */
	getQuestions() {
		return this.questions;
	}

	/**
	 * Get scores
	 */
	getScores() {
		return this.scores;
	}
}