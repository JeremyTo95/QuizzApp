/**
 * Question View Model
 */
export default class QuestionViewModel {
	constructor(questionStore) {
		this.store = questionStore;
	}

	/**
	 * Set the question request
	 * @param {Category desired} cat 
	 * @param {Level desired} level 
	 * @param {Number of answers desired} answers 
	 * @param {Boolean value to define the anecdote} anec 
	 */
	async setQuestion(cat, level, answers = 4, anec = 1) {
		await this.store.setQuestion(cat, level, answers, anec);
	}

	/**
	 * Convert the label into name from the table name specified
	 * @param {table name where we want to get the name} tableName 
	 * @param {Mabel of the data which we want the name} label 
	 */
	async convertLabelToName(tableName, label) {
		var res = await this.store.convertLabelToName(tableName, label);
		return res;
	}
	
	/**
	 * Convert the label into name from the table name specified
	 * @param {table name where we want to get the name} tableName 
	 * @param {Mabel of the data which we want the id} label 
	 */
	async convertLabelToId(tableName, label) {
		var res = await this.store.convertLabelToId(tableName, label);
		return res;
	}

	/**
	 * Get question
	 */
	getQuestion() {
		return this.store.getQuestion();
	}

	/**
	 * Get answer
	 */
	getAnswer() {
		return this.store.getAnswer();
	}

	/**
	 * Get answer index
	 */
	getAnswerIndex() {
		return this.store.getAnswerIndex();
	}

	/**
	 * Get answers
	 */
	getAnswers() {
		return this.store.getAnswers();
	}

	/**
	 * Get score
	 */
	getScore() {
		return this.store.getScore();
	}

	/**
	 * Set the score with the new value
	 * @param {new score} newScore 
	 */
	setScore(newScore) {
		this.setScore(newScore);
	}

	/**
	 * Increase score
	 */
	increaseScore() {
		this.store.increaseScore();
	}

	/**
	 * Get the anecdote
	 */
	getAnecdote() {
		return this.store.getAnecdote();
	}
}