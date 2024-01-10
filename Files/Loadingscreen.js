import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class Loadingscreen extends React.Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.props.navigation.replace('Homescreen2');
			} else {
				this.props.navigation.replace('Login');
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#C953C1" />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
});
