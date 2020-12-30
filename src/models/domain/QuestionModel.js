import      { observable } from 'mobx';
import      apiManager     from '../../data/API';
import      sqlManager     from '../../data/SQLite'
import * as TableNames     from '../../data/SQLite/constants';
import * as DataConstants  from '../../data/constants';

/**
 * Question Model
 * @constructor
 */
export default class QuestionModel {
	@observable question    = undefined;
	@observable answer      = undefined;
	@observable answerIndex = undefined;
	@observable answers     = [];
	@observable score       = 0;
	@observable second      = 0;
	@observable anecdote    = undefined;


	/**
	 * Shuffle the array
	 * @function
	 * @param { array } array - Array to shuffle 
	 */
	shuffleArray(array) {
		let curId = array.length;

		while (0 !== curId) {
			let randId = Math.floor(Math.random() * curId);
			curId -= 1;
			let tmp       = array[curId];
			array[curId]  = array[randId];
			array[randId] = tmp;
		}
		return array;
	}

	/**
	 * HTTP request on the API to get the new question
	 * @function
	 * @param { string  } cat     - Category name for http request on api 
	 * @param { string  } level   - Level id for http request on api  
	 * @param { Integer } answers - Number of answer whish 
	 * @param { Boolean } anec    - Boolean variable to set or not anecdote 
	 */
	async setQuestion(cat, level, answers = 4, anec = 1) {
		var response     = await apiManager.GetQuery(cat, level, answers, anec);
		var responseJSON = JSON.parse(response);

		if (responseJSON['response_code'] == 0) {
			this.question    = responseJSON['results'][0]['question'];
			this.answer      = responseJSON['results'][0]['reponse_correcte'];
			this.answers     = responseJSON['results'][0]['autres_choix'];
			this.anecdote    = responseJSON['results'][0]['anecdote'];
			this.answers     = this.shuffleArray(this.answers);
			sqlManager.insertQuestion(response);
		} else {
			this.question    = DataConstants.GO_BACK_MSG;
			this.answer      = "";
			this.answers     = "";
			this.anecdote    = "";
			console.info('Wait the entire minute before to restart');
		}
	}

	/**
	 * Get the question from id
	 * @function
	 * @param { Integer } id - id of the question 
	 */
	async getQuestionById(id) {
		var response = await sqlManager.ExecuteQuery("SELECT * FROM " + TableNames.QUESTIONS + " WHERE id = " + id, []);
		var raws     = response.raws;
		return raws.row();
	}

	/**
	 * Convert the label into name from the table name specified
	 * @function
	 * @param { string } tableName - Table name where we want to get the name 
	 * @param { string } label     - Label of the data which we want the name
	 */
	async convertLabelToName(tableName, label) {
		var nameCat = await sqlManager.convertLabelToName(tableName, label);
		return nameCat;
	}
	
	/**
	 * Convert the label into id from the table name specified
	 * @function
	 * @param { string } tableName - Table name where we want to get the name 
	 * @param { string } label     - Identifier of the data which we want the id 
	 */
	async convertLabelToId(tableName, label) {
		var idLevel = await sqlManager.convertLabelToId(tableName, label);
		return idLevel;
	}

	/**
	 * Return the question
	 * @function
	 */
	getQuestion() {
		return this.question;
	}
	
	/**
	 * Return the answer
	 * @function
	 */
	getAnswer() {
		return this.answer;
	}

	/**
	 * Return the index of the answer from the list of answer
	 * @function
	 */
	getAnswerIndex() {
		for (let i = 0; i < this.answers.length; i++) 
			if (this.answers[i] == this.answer) 
				return i;
		
		return -1;
	}

	/**
	 * Return the list of answers
	 * @function
	 */
	getAnswers() {
		return this.answers;
	}

	/**
	 * Return the score
	 * @function
	 */
	getScore() {
		return this.score;
	}

	/**
	 * Set the score with the new score value in parameter
	 * @function
	 * @param { Integer } newScore - New score value 
	 */
	setScore(newScore) {
		this.score = newScore;
	}

	/**
	 * Increase the score
	 * @function
	 */
	increaseScore() {
		var score = this.score;
		this.score = score + 1;
	}

	/**
	 * Return the anecdote
	 * @function
	 */
	getAnecdote() {
		return this.anecdote;
	}
}