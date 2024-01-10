//npm install react-native
//npm cache clean --force
//npm i firebase@7.9.0
//npm i react-native-check-box
//npm install @react-navigation/native
//expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
//npm install --save react-native-vector-icons
//npm install react-native-paper
//npm install @react-navigation/drawer`

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Loginscreen from './Files/Loginscreen';
import Signupscreen from './Files/Signupscreen';
import Loadingscreen from './Files/Loadingscreen';
import Homescreen from './Files/Homescreen';
import Homescreen2 from './Files/Homescreen2';
import Chatscreen3 from './Files/Chatscreen3';
import Chatscreen2 from './Files/Chatscreen2';
import * as firebase from 'firebase';
import { firebaseConfig } from './Config';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

firebase.database.enableLogging(true);

export default class App extends React.Component {
	render() {
		const Drawer = createDrawerNavigator();
		const stack = createStackNavigator();
		return (
			<NavigationContainer>
				<stack.Navigator initialRouteName="Loadingscreen">
					<stack.Screen
						options={{ headerShown: false }}
						name="Loading"
						component={Loadingscreen}
					/>
					<stack.Screen
						options={{ headerShown: false }}
						name="Login"
						component={Loginscreen}
						options={{
							headerStyle: { backgroundColor: '#FFCC70' },
							headerTintColor: '#C953C1',
							headerTitleStyle: { fontWeight: 'bold' },
						}}
					/>
					<stack.Screen
						options={{ headerShown: false }}
						name="Homescreen2"
						component={Homescreen2}
					/>

					<stack.Screen
						name="Signup"
						component={Signupscreen}
						options={{
							headerStyle: { backgroundColor: '#FFCC70' },
							headerTintColor: '#C953C1',
							headerTitleStyle: { fontWeight: 'bold' },
						}}
					/>
					<stack.Screen
						name="Chatscreen2"
						component={Chatscreen2}
						options={({ route }) => ({
							title: route.params.group_name,
							headerTitleAlign: 'center',
							headerTitleAllowFontScaling: true,
							headerStyle: {
								backgroundColor: '#28324B',
							},

							headerTintColor: '#FCFCFC',
							headerTitleStyle: {
								fontWeight: 'bold',
								fontSize: 30,
								fontFamily: 'Roboto',
							},
						})}
					/>
				</stack.Navigator>
			</NavigationContainer>
		);
	}
}
