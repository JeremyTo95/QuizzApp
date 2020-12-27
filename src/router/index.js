import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeRoutes from './home.routes';
// import bottomHomeNavigator from './bottomHomeNavigator.routes';

const RootStack = createStackNavigator();

const Router = () => {
	return (<RootStack.Navigator>
		<RootStack.Screen
			name={'Home'}
			component={ HomeRoutes }
			options={{
				headerShown: false
			}}
		/>
	</RootStack.Navigator>)
}

export default Router;