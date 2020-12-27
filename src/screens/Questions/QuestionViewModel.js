export default class QuestionViewModel {
	constructor(questionStore) {
		this.store = questionStore;
	}

	async setQuestion(cat, level, answers = 4, anec = 1) {
		await this.store.setQuestion(cat, level, answers, anec);
	}

	getQuestion() {
		return this.store.getQuestion();
	}

	getAnswer() {
		return this.store.getAnswer();
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