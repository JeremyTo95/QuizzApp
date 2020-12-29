import React              from 'react';
import { inject }         from 'mobx-react';
import QuestionController from './QuestionController';
import QuestionViewModel  from './QuestionViewModel';
import RootStore          from '../../models/RootStore';

/**
 * Question provider
 */
@inject(RootStore.type.QUESTION_MODEL)
export default class QuestionProvider extends React.Component {
	constructor(props) {
		super (props);
		const questionViewModel = props[RootStore.type.QUESTION_MODEL];
		this.viewModel          = new QuestionViewModel(questionViewModel);
	}

	render() {
		console.log(this.props);
		return (
			<QuestionController rootProps={ this.props } viewModel={ this.viewModel } />
		);
	}
}