import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChallengesScreen from '../screens/ChallengesScreen';
import DetailsScreen from '../screens/DetailsScreen';

import * as screen_label from '../assets/constants/screen_labels';

const ChallengesStack = createStackNavigator();

const ChallengesRoutes = () => {
	return (
	<ChallengesStack.Navigator>
		<ChallengesStack.Screen
			name={ screen_label.CHALLENGE_SCREEN }
			component={ ChallengesScreen }
			options={{
				headerShown: false
			}}
		/>
		<ChallengesStack.Screen
			name={ screen_label.DETAILS_SCREEN }
			component={ DetailsScreen }
			options={{
				headerShown: false
			}}
		/>
	</ChallengesStack.Navigator>)
}

export default ChallengesRoutes;