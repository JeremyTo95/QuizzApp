export default class QuestionViewModel {
	constructor(questionStore) {
		this.store = questionStore;
	}

	async setQuestion(cat, level, answers = 4, anec = 1) {
		await this.store.setQuestion(cat, level, answers, anec);
	}

	async convertLabelToName(tableName, id) {
		var res = await this.store.convertLabelToName(tableName, id);
		return res;
	}
	
	async convertLabelToId(tableName, id) {
		var res = await this.store.convertLabelToId(tableName, id);
		return res;
	}

	getQuestion() {
		return this.store.getQuestion();
	}

	getAnswer() {
		return this.store.getAnswer();
	}

	getAnswerIndex() {
		return this.store.getAnswerIndex();
	}

	getAnswers() {
		return this.store.getAnswers();
	}

	getScore() {
		return this.store.getScore();
	}

	setScore(newScore) {
		this.setScore(newScore);
	}

	increaseScore() {
		this.store.increaseScore();
	}

	getAnecdote() {
		return this.store.getAnecdote();
	}
}