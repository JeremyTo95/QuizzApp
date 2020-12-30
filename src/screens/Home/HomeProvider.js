import React from 'react';
import { inject } from 'mobx-react';
import HomeController from './HomeController';
import HomeViewModel from './HomeViewModel';
import RootStore from '../../models/RootStore';

/**
 * Home provider
 * @constructor
 */
@inject(RootStore.type.HOME_MODEL)
class HomeProvider extends React.Component {
	constructor(props) {
		super (props);
		const homeViewModel = props[RootStore.type.HOME_MODEL];
		this.viewModel      = new HomeViewModel(homeViewModel);
	}

	render() {
		return (
			<HomeController nav={ this.props.navigation } viewModel={ this.viewModel } />
		);
	}
}

export default HomeProvider;