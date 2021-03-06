import      React                    from 'react';
import      { createStackNavigator } from '@react-navigation/stack';

import      HomeProvider             from '../screens/Home/HomeProvider';
import      QuestionProvider         from '../screens/Questions/QuestionProvider';

import * as screen_labels            from '../screens/constants';

const HomeStack = createStackNavigator();

/**
 * Home routes : define all home routes 
 * @constructor
 */
const HomeRoutes = () => {
	return (<HomeStack.Navigator>
		<HomeStack.Screen
			name={ screen_labels.HOME }
			component={ HomeProvider }
			options={{
				headerShown: false
			}}
		/>
		<HomeStack.Screen
			name={ screen_labels.QUESTION }
			component={ QuestionProvider }
			options={{
				headerShown: false
			}}
		/>
	</HomeStack.Navigator>)
}

export default HomeRoutes;