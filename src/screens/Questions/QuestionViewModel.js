/**
 * Question View Model
 * @constructor
 * @param { QuestionModel } questionStore - Question Model
 */
export default class QuestionViewModel {
	constructor(questionStore) {
		this.store = questionStore;
	}

	/**
	 * Set the question request
	 * @function
	 * @param { string } cat - Category desired 
	 * @param { string } level - Level desired 
	 * @param { Integer } answers - Number of answers desired 
	 * @param { Boolean } anec - Boolean value to define the anecdote 
	 */
	async setQuestion(cat, level, answers = 4, anec = 1) {
		await this.store.setQuestion(cat, level, answers, anec);
	}

	/**
	 * Convert the label into name from the table name specified
	 * @function
	 * @param { string } tableName - Table name where we want to get the name 
	 * @param { string } label - Label of the data which we want the name 
	 */
	async convertLabelToName(tableName, label) {
		var res = await this.store.convertLabelToName(tableName, label);
		return res;
	}
	
	/**
	 * Convert the label into name from the table name specified
	 * @function
	 * @param { string } tableName - Table name where we want to get the name 
	 * @param { string } label - Label of the data which we want the id 
	 */
	async convertLabelToId(tableName, label) {
		var res = await this.store.convertLabelToId(tableName, label);
		return res;
	}

	/**
	 * Get question
	 * @function
	 */
	getQuestion() {
		return this.store.getQuestion();
	}

	/**
	 * Get answer
	 * @function
	 */
	getAnswer() {
		return this.store.getAnswer();
	}

	/**
	 * Get answer index
	 * @function
	 */
	getAnswerIndex() {
		return this.store.getAnswerIndex();
	}

	/**
	 * Get answers
	 * @function
	 */
	getAnswers() {
		return this.store.getAnswers();
	}

	/**
	 * Get score
	 * @function
	 */
	getScore() {
		return this.store.getScore();
	}

	/**
	 * Set the score with the new value
	 * @function
	 * @param { Integer } newScore - new score 
	 */
	setScore(newScore) {
		this.setScore(newScore);
	}

	/**
	 * Increase score
	 * @function
	 */
	increaseScore() {
		this.store.increaseScore();
	}

	/**
	 * Get the anecdote
	 * @function
	 */
	getAnecdote() {
		return this.store.getAnecdote();
	}
}