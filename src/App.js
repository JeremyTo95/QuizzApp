import SQLite from 'react-native-sqlite-storage';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'mobx-react';

import 'react-native-gesture-handler';

import RootStore from './models/RootStore';
// import HomeProvider from './screens/Home/HomeProvider.js';
import Router from './router';


global.db = SQLite.openDatabase({
	name: 'SQLite',
	location: 'default',
	createFromLocation: '~mydb.db'
}, () => {},
error => {
	console.log("ERROR : " + error);
});

const rootStore = new RootStore();

export default class App extends React.Component {
	render() {
		console.log('home');
		return (
			// <Text>Hi</Text>
			<Provider { ...rootStore.getStores() }>
				{/* <HomeProvider /> */}
				<View style={{flex: 1}}>
					<NavigationContainer>
						<StatusBar barStyle='default' />
						<Router />
					</NavigationContainer>
				</View>
			</Provider>
		)
	}
}