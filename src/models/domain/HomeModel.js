import { observable }  from 'mobx';
import sqlManager      from '../../data/SQLite';
import * as TableNames from '../../data/SQLite/constants';

/**
 * Home Model
 * @constructor
 */
export default class HomeModel {
	@observable categories  = [];
	@observable levels      = [];
	@observable questions   = [];

	/**
	 * Setup categories
	 * @function
	 */
	async setCategories() {
		this.categories = await sqlManager.selectTable(TableNames.CATEGORIES);
	}

	/**
	 * Setup levels
	 * @function
	 */
	async setLevels() {
		this.levels     = await sqlManager.selectTable(TableNames.LEVELS);
	}

	/**
	 * Setup questions
	 * @function
	 */
	async setQuestions() {
		this.questions  = await sqlManager.selectTable(TableNames.QUESTIONS);
		
		for (let i = 0; i < this.questions.length; i++) {
			var category = await sqlManager.convertIdToLabel(TableNames.CATEGORIES, this.questions[i]['idCategory']);
			var level    = await sqlManager.convertIdToLabel(TableNames.LEVELS,     this.questions[i]['idLevel']);
			this.questions[i]['category'] = category;
			this.questions[i]['level']    = level;
		}
	}

	/**
	 * Convert the id into label
	 * @function
	 * @param { string  } tableName - Table name where we want to get data 
	 * @param { Integer } id        - Identifier which match with the label 
	 */
	async convertIdToLabel(tableName, id) {
		var res = await sqlManager.convertIdToLabel(tableName, id);
		return res;
	}

	/**
	 * Initialize the data
	 * @function
	 */
	async initData() {
		await this.setCategories();
		await this.setLevels();
		await this.setQuestions();
	}

	/**
	 * Delete the questions in database
	 * @function
	 */
	async deleteQuestionsHistory() {
		await sqlManager.deleteQuestionsHistory();
	}

	/**
	 * Get categories
	 * @function
	 */
	getCategories() {
		return this.categories;
	}

	/**
	 * Get levels
	 * @function
	 */
	getLevels() {
		return this.levels;
	}

	/**
	 * Get questions count
	 * @function
	 */
	getNbQuestions() {
		return this.nbQuestions;
	}

	/**
	 * Get questions
	 * @function
	 */
	getQuestions() {
		return this.questions;
	} 
}