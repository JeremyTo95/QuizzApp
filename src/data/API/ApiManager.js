import React from 'react';
import sqlManager from '../SQLite'
import * as ApiOptions from './ApiOptions';

export default class ApiManager extends React.Component {
	constructor() {
		super();
		console.log("ApiManager");
		this.state = {
			data: "null"
		}
	}

	ExecuteQuery = (cat, diff, nbAnswers = 4, anec = 1) => new Promise((resolve, reject) => {
		const url = ApiOptions.API_URL + ApiOptions.API_KEY_1 + ApiOptions.API_SET_CATEGORY + cat + ApiOptions.API_SET_DIFFICULTY + diff + ApiOptions.API_SET_NB_CHOICE_OPTIONS + nbAnswers + ApiOptions.API_IS_ANECDOTE + anec;
		console.log(url);
		fetch(url, { method: 'GET' })
		.then((response) => response.text())
		.then((responseText) => {
			resolve(responseText);
		})
		.catch((error) => {
			reject(error);
		});
	});

	async GetQuery(cat, diff, nbAnswers = 4, anec = 1) {
		var data = await this.ExecuteQuery(cat, diff, nbAnswers, anec);
		
		return data;
	}
}