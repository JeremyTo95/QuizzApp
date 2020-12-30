import React           from 'react';
import * as ApiOptions from './ApiOptions';

/**
 * API Manager : Get data from API
 * @constructor
 */
export default class ApiManager extends React.Component {
	constructor() {
		super();
		this.state = { data: "null" }
	}

	/**
	 * HTTP request on the API
	 * @function
	 * @param { string  } cat       - Category to search 
	 * @param { string  } diff      - Level to search 
	 * @param { Integer } nbAnswers - Number of answer desired 
	 * @param { Boolean } anec      - Boolean value to define the anecdote 
	 */
	ExecuteQuery = (cat, diff, nbAnswers = 4, anec = 1) => new Promise((resolve, reject) => {
		const url = ApiOptions.API_URL + ApiOptions.API_KEY_1 + ApiOptions.API_SET_CATEGORY + cat + ApiOptions.API_SET_DIFFICULTY + diff + ApiOptions.API_SET_NB_CHOICE_OPTIONS + nbAnswers + ApiOptions.API_IS_ANECDOTE + anec;
		console.log(url);

		fetch(url, { method: 'GET' })
		.then(  (response)     => response.text())
		.then(  (responseText) => { resolve(responseText); })
		.catch( (error)        => { reject(error); });
	});

	/**
	 * Get Query on the API
	 * @function
	 * @param { string  } cat       - Category to search 
	 * @param { string  } diff      - Level to search 
	 * @param { Integer } nbAnswers - Number of answer desired 
	 * @param { Boolean } anec       - Boolean value to define the anecdote 
	 */
	async GetQuery(cat, diff, nbAnswers = 4, anec = 1) {
		var data = await this.ExecuteQuery(cat, diff, nbAnswers, anec);
		
		return data;
	}
}