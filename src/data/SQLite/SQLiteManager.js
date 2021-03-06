import React  from 'react';
import SQLite from 'react-native-sqlite-storage';

/**
 * SQL Manager : Manage the local data
 * @constructor
 */
export default class SQLiteManager extends React.Component {
	constructor() {
		super();
		SQLite.DEBUG = true;
	}

	/**
	 * Execute query like 
	 * "ExecuteQuery(INSERT INTO Levels(label, name) VALUES (?, ?), ['LabelValue', 'NameValue'])"
	 * @function
	 * @param { string } sql    - SQL query 
	 * @param { array  } params - Parameters 
	 */
	ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
		db.transaction((trans) => {
			trans.executeSql(
				sql, 
				params, 
				(trans, results) => { resolve(results); }, 
				(error) => { reject(error); }
			);
		});
	});

	/**
	 * Select data from table
	 * @function
	 * @param { string } tableName - Table name where we want to select data 
	 */
	async selectTable(tableName) {
		let select = await this.ExecuteQuery("SELECT * FROM " + tableName + " ORDER BY id DESC",  []);
		var rows   = select.rows;
		return rows.raw();
	}

	/**
	 * Convert the label into name
	 * @function
	 * @param { string } tableName - Table name where we want to search the id 
	 * @param { string } label     - Label which is gonna send back the name 
	 */
	async convertLabelToName(tableName, label) {
		let nameSQL = await this.ExecuteQuery("SELECT name FROM " + tableName + " WHERE label = '" + label + "'", []);
		var rows    = nameSQL.rows;
		var name    = rows.raw();
		return name[0]['name'];
	}

	/**
	 * Convert the label into id
	 * @function
	 * @param { string } tableName - Table name where we want to search the id 
	 * @param { string } label     - Label which is gonna send back the id 
	 */
	async convertLabelToId(tableName, label) {
		let idSQL = await this.ExecuteQuery("SELECT id FROM " + tableName + " WHERE label = '" + label + "'", []);
		var rows  = idSQL.rows;
		var id    = rows.raw();
		return id[0]['id'];
	}

	/**
	 * Convert the id into label
	 * @function
	 * @param { string } tableName - Table name where we want to search the label
	 * @param { Integer} id        - Id which is gonnad send back the label 
	 */
	async convertIdToLabel(tableName, id) {
		let labelSQL = await this.ExecuteQuery("SELECT label FROM " + tableName + " WHERE id = " + id, []);
		var rows     = labelSQL.rows;
		var label    = rows.raw();
		return label[0]['label'];
	}

	/**
	 * Shuffle the array
	 * @function
	 * @param { Array } array - Array to shuffle 
	 */
	shuffleArray(array) {
		let curId = array.length;

		while (0 !== curId) {
			let randId    = Math.floor(Math.random() * curId);
			curId         -= 1;
			let tmp       = array[curId];
			array[curId]  = array[randId];
			array[randId] = tmp;
		}
		return array;
	}

	/**
	 * Delete the questions in database
	 * @function
	 */
	async deleteQuestionsHistory() {
		await this.ExecuteQuery("DELETE FROM QUESTIONS", []);
	}

	/**
	 * Insert question in database from string response
	 * @function
	 * @param { string } dataStr - Answer data in string format 
	 */
	async insertQuestion(dataStr) {
		var cat      = undefined;	// initialisation of the category variable
		var level    = undefined;	// initialisation of the level variable
		var answer   = undefined;	// initialisation of the answer variable
		var question = undefined;	// initialisation of the question variable
		var anecdote = undefined;	// initialisation of the anecdote variable
		var theme    = undefined;	// initialisation of the theme variable
		var answers  = {};			// initialisation of the answers variable

		JSON.parse(dataStr, (k, v) => {									// Setup of the variables with the data
			if      (k == 'categorie')                cat        = v;
			else if (k == 'theme')                    theme      = v;
			else if (k == 'difficulte')               level      = v;
			else if (k == 'question')                 question   = v;
			else if (k == 'reponse_correcte')         answer     = v;
			else if (k == 'anecdote')                 anecdote   = v;
			else if (k == 0 && typeof(v) == 'string') answers[k] = v;
			else if (k == 1 && typeof(v) == 'string') answers[k] = v;
			else if (k == 2 && typeof(v) == 'string') answers[k] = v;
			else if (k == 3 && typeof(v) == 'string') answers[k] = v; 
		});

		const getIdCategorySQL  = "SELECT id FROM CATEGORIES WHERE name = '" + cat + "'";	// Get category id query
		const getIdLevelSQL     = "SELECT id FROM LEVELS WHERE name = '" + level + "'";		// Qet level id query
		var idCategory          = await this.ExecuteQuery(getIdCategorySQL, []);
		var idLevel             = await this.ExecuteQuery(getIdLevelSQL, []);
		idCategory              = idCategory.rows.raw();
		idLevel                 = idLevel.rows.raw();
		idCategory              = idCategory[0].id;
		idLevel                 = idLevel[0].id;

		const insertQuestionSQL = "INSERT INTO QUESTIONS(idCategory, idLevel, label, anecdote, theme, answer, answers) VALUES (?, ?, ?, ?, ?, ?, ?)"; 		// Insert question query
		var answersJSON         = this.shuffleArray([answers['0'], answers['1'], answers['2'], answers['3']]);
		let questionInsert      = await this.ExecuteQuery(insertQuestionSQL, [idCategory, idLevel, question, anecdote, theme, answer, JSON.stringify(answersJSON)]);	// Execution
		
		if (questionInsert['rowsAffected'] == 1) console.info("Row inserted");	// Debug info console
		else console.error("Error insert question")    						// Debug info console
	}
}