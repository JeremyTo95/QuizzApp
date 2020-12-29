/**
 * Home View Model
 */
export default class HomeViewModel {
	constructor(homeStore) {
		this.store = homeStore;
	}

	/**
	 * Initialize data
	 */
	async initData() {
		await this.store.initData();
	}

	async deleteQuestionsHistory() {
		await this.store.deleteQuestionsHistory();
	}

	/**
	 * Convert the id into label for the given tablename
	 * @param {Table name where we want data} tableName 
	 * @param {Identifier of the data which we want the label} id 
	 */
	async convertIdToLabel(tableName, id) {
		var label = await this.store.convertIdToLabel(tableName, id);
		return label;
	}

	/**
	 * Get categories
	 */
	getCategories() {
		return this.store.getCategories();
	}

	/**
	 * Get levels
	 */
	getLevels() {
		return this.store.getLevels();
	}

	/**
	 * Get number of question
	 */
	getNbQuestions() {
		return this.store.getNbQuestions();
	}

	/**
	 * Get questions
	 */
	getQuestions() {
		return this.store.getQuestions();
	}
}