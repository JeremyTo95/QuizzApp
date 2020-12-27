import React from 'react';
import SQLite from 'react-native-sqlite-storage';


export default class SQLiteManager extends React.Component {
	constructor() {
		super();
		SQLite.DEBUG = true;
	}

	/**
	 * Execute query like 
	 * "ExecuteQuery(INSERT INTO Levels(label, name) VALUES (?, ?), ['LabelValue', 'NameValue'])"
	 * @param {SQL query} sql 
	 * @param {Parameters} params 
	 */
	ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
		db.transaction((trans) => {
			trans.executeSql(sql, params, (trans, results) => {
				resolve(results);
			},
			(error) => {
				reject(error);
			});
		});
	});

	/**
	 * Select data from table
	 * @param {Table name where we want to select data} tableName 
	 */
	async selectTable(tableName) {
		let select = await this.ExecuteQuery("SELECT * FROM " + tableName,  []);
		var rows = select.rows;
		return rows.raw();
	}

	/**
	 * Convert the label into name
	 * @param {Table name where we want to search the id} tableName 
	 * @param {Label which is gonna send back the name} label 
	 */
	async convertLabelToName(tableName, label) {
		let nameSQL = await this.ExecuteQuery("SELECT name FROM " + tableName + " WHERE label = '" + label + "'", []);
		var rows = nameSQL.rows;
		var name = rows.raw();
		return name[0]['name'];
	}

	/**
	 * Convert the label into id
	 * @param {Table name where we want to search the id} tableName 
	 * @param {Label which is gonna send back the id} label 
	 */
	async convertLabelToId(tableName, label) {
		let idSQL = await this.ExecuteQuery("SELECT id FROM " + tableName + " WHERE label = '" + label + "'", []);
		var rows = idSQL.rows;
		var id = rows.raw();
		return id[0]['id'];
	}

	/**
	 * Insert question in database from string response
	 * @param { Donnée réponse de la requête en format String } dataStr 
	 */
	async insertQuestion(dataStr) {
		var cat      = undefined;
		var level    = undefined;
		var answer   = undefined;
		var question = undefined;
		var anecdote = undefined;
		var theme    = undefined;
		var answers  = {};

		JSON.parse(dataStr, (k, v) => {
			if      (k == 'categorie')                cat                   = v;
			else if (k == 'theme')                    theme                 = v;
			else if (k == 'difficulte')               level                 = v;
			else if (k == 'question')                 question              = v;
			else if (k == 'reponse_correcte')         answer                = v;
			else if (k == 'anecdote')                 anecdote              = v;
			else if (k == 0 && typeof(v) == 'string') answers['answer' + k] = v;
			else if (k == 1 && typeof(v) == 'string') answers['answer' + k] = v;
			else if (k == 2 && typeof(v) == 'string') answers['answer' + k] = v;
			else if (k == 3 && typeof(v) == 'string') answers['answer' + k] = v; 
		});

		// OK valider / Pas touche
		const getIdCategorySQL  = "SELECT id FROM CATEGORIES WHERE name = '" + cat + "'";
		const getIdLevelSQL     = "SELECT id FROM LEVELS WHERE name = '" + level + "'";
		var idCategory          = await this.ExecuteQuery(getIdCategorySQL, []);
		var idLevel             = await this.ExecuteQuery(getIdLevelSQL, []);
		idCategory              = idCategory.rows.raw();
		idLevel                 = idLevel.rows.raw();
		idCategory              = idCategory[0].id;
		idLevel                 = idLevel[0].id;

		const insertQuestionSQL = "INSERT INTO QUESTIONS(idCategory, idLevel, label, anectode, theme, answer, answers) VALUES (?, ?, ?, ?, ?, ?, ?)";
		let questionInsert = await this.ExecuteQuery(insertQuestionSQL, [idCategory, idLevel, question, anecdote, theme, answer, JSON.stringify(answers)]);
		console.log(questionInsert);
		if (questionInsert['rowsAffected'] == 1) console.info("Row inserted");
		else console.error("Error insert question")    
	}
}