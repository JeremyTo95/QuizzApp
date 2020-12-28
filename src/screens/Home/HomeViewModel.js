export default class HomeViewModel {
	constructor(homeStore) {
		this.store = homeStore;
	}

	async initData() {
		await this.store.initData();
	}

	async convertIdToLabel(tableName, id) {
		var label = await this.store.convertIdToLabel(tableName, id);
		return label;
	}

	getCategories() {
		return this.store.getCategories();
	}

	getLevels() {
		return this.store.getLevels();
	}

	getNbQuestions() {
		return this.store.getNbQuestions();
	}

	getQuestions() {
		return this.store.getQuestions();
	}

	getScores() {
		return this.store.getScores();
	}
}