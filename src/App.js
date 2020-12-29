import 'react-native-gesture-handler';

import      SQLite                  from 'react-native-sqlite-storage';

import      React                   from 'react';
import      { View, StatusBar }     from 'react-native';
import      { NavigationContainer } from '@react-navigation/native';
import      { Provider }            from 'mobx-react';


import      RootStore               from './models/RootStore';
import * as Colors                  from './assets/Colors';
import      Router                  from './router';

/**
 * Open the database
 */
global.db = SQLite.openDatabase(
	{
		name:               'SQLite',
		location:           'default',
		createFromLocation: '~mydb.db'
	}, 
	() => {}, 
	error => { console.log("ERROR : " + error); }
);

const rootStore = new RootStore();

/**
 * App class
 */
export default class App extends React.Component {
	render() {
		return (
			<Provider { ...rootStore.getStores() }>
				<View style={{flex: 1}}>
					<NavigationContainer>
						<StatusBar barStyle='light-content' backgroundColor={ Colors.BACKGROUND_COLOR } />
						<Router />
					</NavigationContainer>
				</View>
			</Provider>
		)
	}
}