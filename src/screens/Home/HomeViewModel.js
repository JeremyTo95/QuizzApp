export default class HomeViewModel {
	constructor(homeStore) {
		this.store = homeStore;
	}

	async initData() {
		await this.store.initData();
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