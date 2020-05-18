/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieSearchScreen from './screens/MovieSearchScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

const MainStack = createStackNavigator();

class App extends Component {
	render() {
		return (
			<NavigationContainer>
				<MainStack.Navigator initialRouteName="MovieSearch">
				<MainStack.Screen
					name = "MovieSearch"
					component = {MovieSearchScreen}
					options = {{
						title: "Movie Search",
						headerTitleStyle: {
							textAlign: "center"
						},
						headerStyle: {
						}
					}}
				/>
				<MainStack.Screen
					name = "MovieDetails"
					component = {MovieDetailsScreen}
					options = {
						({route}) => ({
							title: route.params.Title,
							headerTitleStyle: {
								textAlign: "center"
							},
							headerLeft: null
						})
					}
					
				/>
				</MainStack.Navigator>
			</NavigationContainer>
		)
	}
}

export default App;
