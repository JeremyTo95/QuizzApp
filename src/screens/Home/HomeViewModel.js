/**
 * Home View Model
 * @constructor
 * @param { HomeModel } homeStore - Home Model
 */
export default class HomeViewModel {
	constructor(homeStore) {
		this.store = homeStore;
	}

	/**
	 * Initialize data
	 * @function
	 */
	async initData() {
		await this.store.initData();
	}

	/**
	 * Delete the question history
	 * @function
	 */
	async deleteQuestionsHistory() {
		await this.store.deleteQuestionsHistory();
	}

	/**
	 * Convert the id into label for the given tablename
	 * @function
	 * @param { string } tableName - Table name where we want data 
	 * @param { Integer } id - Identifier of the data which we want the label 
	 */
	async convertIdToLabel(tableName, id) {
		var label = await this.store.convertIdToLabel(tableName, id);
		return label;
	}

	/**
	 * Get categories
	 * @function
	 */
	getCategories() {
		return this.store.getCategories();
	}

	/**
	 * Get levels
	 * @function
	 */
	getLevels() {
		return this.store.getLevels();
	}

	/**
	 * Get number of question
	 * @function
	 */
	getNbQuestions() {
		return this.store.getNbQuestions();
	}

	/**
	 * Get questions
	 * @function
	 */
	getQuestions() {
		return this.store.getQuestions();
	}
}