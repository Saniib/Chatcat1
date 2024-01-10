import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import firebase from 'firebase';

export default class Loginscreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	userSignin(email, password) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				const userId = user.user.uid;
				const deviceName = device.modelName;

				// save to database the device info!
				firebase
					.database()
					.ref('users/' + userId + '/device/')
					.set({
						device_model_name: deviceName,
					});

				this.props.navigation.replace('Homescreen');
			})
			.catch((error) => {
				Alert.alert(error.message);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView>
					<Image
						source={require('../assets/header.png')}
						style={styles.header}></Image>
					<View style={styles.divider} />

					<View>
						<TextInput
							style={styles.email}
							placeholder="   Email"
							placeholderTextColor="#A19999"
							onChangeText={(email) => this.setState({ email })}
						/>

						<TextInput
							style={styles.Password}
							placeholder="   Password"
							placeholderTextColor="#A19999"
							onChangeText={(password) => this.setState({ password })}
							secureTextEntry={true}
						/>

						<TouchableOpacity
							style={styles.SigninButton}
							onPress={() =>
								this.userSignin(this.state.email, this.state.password)
							}>
							<Text style={styles.Buttontext}>SIGN IN</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => console.log()}>
							<Text style={styles.forgettext}>Forgotten password?</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.mytext}> Dont have an account? </Text>

					<TouchableOpacity
						style={styles.Signupbut}
						onPress={() => {
							this.props.navigation.navigate('Signup');
						}}>
						<Text style={styles.Signuptext}>SIGN UP</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
				<Image
					source={require('../assets/profile.png')}
					style={styles.Usernameicon}
				/>

				<Image
					source={require('../assets/pass.png')}
					style={styles.passwordicon}
				/>

				<Image source={require('../assets/footer.png')} style={styles.footer} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	divider: {
		marginTop: -40,
	},
	header: {
		width: '100%',
		height: 175,
		marginTop: -25,
	},
	email: {
		width: 260,
		height: 35,
		marginTop: 140,
		marginLeft: 100,
		borderWidth: 2,
		borderColor: 'white',
		borderBottomColor: '#C953C1',
	},
	Password: {
		width: 260,
		height: 35,
		marginTop: 30,
		marginLeft: 100,
		borderWidth: 2,
		borderColor: 'white',
		borderBottomColor: '#C953C1',
	},
	SigninButton: {
		width: 320,
		height: 42,
		marginLeft: 40,
		borderWidth: 1,
		borderColor: '#C953C1',
		backgroundColor: '#FFCC70',
		marginTop: 50,
		marginRight: 20,
		borderRadius: 5,
	},
	Buttontext: {
		color: 'white',
		paddingLeft: 115,
		paddingTop: 9,
		letterSpacing: 1,
		fontWeight: '700',
		fontSize: 17,
	},
	forgettext: {
		marginLeft: 125,
		marginTop: 10,
		color: '#C953C1',
		fontWeight: 'bold',
	},
	mytext: {
		marginTop: 15,
		marginLeft: 80,
		fontSize: 15,
	},
	Signupbut: {
		marginLeft: 243,
		marginTop: -17,
		width: 50,
		height: 15,
	},
	Signuptext: {
		width: 80,
		marginTop: -3,
		marginLeft: -1,
		color: '#FFCC70',
		fontWeight: 'bold',
		fontSize: 17,
	},

	Usernameicon: {
		width: 30,
		height: 30,
		marginBottom: 70,
		marginTop: -245,
		marginLeft: 50,
		alignSelf: 'flex-start',
	},
	passwordicon: {
		width: 22,
		height: 22,
		marginTop: -27,
		marginLeft: 55,
		alignSelf: 'flex-start',
	},
	footer: {
		width: '100%',
		height: 90,
		marginTop: 190,
	},
});
