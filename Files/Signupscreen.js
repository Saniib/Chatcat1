import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
	Dimensions,
	Image,
	Alert,
} from 'react-native';
import firebase from 'firebase';
import CheckBox from 'react-native-check-box';
let { height, width } = Dimensions.get('window');
export default class Signupscreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Username: 'abc',
			email: 'ab2c@gmail.com',
			password: '123456789',
			ContactNum: '09876567890',
		};
	}

	userSignup(email, Username, ContactNum, password) {
		firebase

			.auth()
			.createUserWithEmailAndPassword(email, password)

			.then(() => {
				firebase.auth().currentUser.updateProfile({
					displayName: Username,
				});
				this.props.navigation.replace('Login');
			})
			.catch((error) => {
				Alert.alert(error.message);
			});

		firebase
			.database()
			.ref('users/' + ContactNum)
			.update({
				Username: Username,
				email: email,
				ContactNum: ContactNum,
			})
			.catch((error) => {
				alert(error.message);
			});
	}
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					source={require('../assets/header.png')}
					style={styles.header}></ImageBackground>
				<View style={styles.divider}>
					<TextInput
						style={styles.CreateUsername}
						placeholder="   Username"
						placeholderTextColor="#A19999"
						onChangeText={(Text) => this.setState({ Username: Text })}
					/>

					<TextInput
						style={styles.CreateEmail}
						placeholder="   Email"
						placeholderTextColor="#A19999"
						onChangeText={(Text) => this.setState({ email: Text })}
					/>

					<TextInput
						style={styles.CreatePassword}
						placeholder="   Create a Password"
						placeholderTextColor="#A19999"
						onChangeText={(Text) => this.setState({ password: Text })}
						secureTextEntry={true}
					/>

					<TextInput
						style={styles.Contact}
						placeholder="   Contact Number"
						placeholderTextColor="#A19999"
						onChangeText={(Text) => this.setState({ ContactNum: Text })}
					/>
				</View>

				<CheckBox
					style={styles.checkbox}
					onClick={() => {
						this.setState({ isChecked: !this.state.isChecked });
					}}
					isChecked={this.state.isChecked}
				/>
				<Text style={styles.termstext}>I have accepted the </Text>
				<TouchableOpacity style={styles.termsbut} onPress={() => console.log()}>
					<Text style={styles.termsbutton}>Terms & Condition</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.Signupbut}
					onPress={() => {
						this.state.isChecked
							? this.userSignup(
									this.state.email,
									this.state.Username,

									this.state.ContactNum,
									this.state.password
							  )
							: ToastAndroid.show(
									'Please accept Terms & Condition',
									ToastAndroid.SHORT
							  );
					}}>
					<Text style={styles.Signuptext}>SIGN UP</Text>
				</TouchableOpacity>
				<Image
					source={require('../assets/profile.png')}
					style={styles.usernameicon}
				/>
				<Image
					source={require('../assets/mail.png')}
					style={styles.emailicon}
				/>
				<Image
					source={require('../assets/pass.png')}
					style={styles.passwordicon}
				/>
				<Image
					source={require('../assets/phone.png')}
					style={styles.contacticon}
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
		marginTop: -20,
	},
	createtext: {
		color: '#C4D1D5',
		fontSize: 18,
		marginTop: 130,
		marginLeft: 30,
		letterSpacing: 1,
	},
	CreateUsername: {
		width: 265,
		height: 40,
		marginTop: 60,
		marginLeft: 90,
		borderWidth: 2,
		borderColor: 'white',
		borderBottomColor: '#c850c0',
	},
	CreateEmail: {
		width: 265,
		height: 40,
		marginTop: 25,
		marginLeft: 90,
		borderWidth: 2,
		borderColor: 'white',
		borderBottomColor: '#c850c0',
	},
	CreatePassword: {
		width: 265,
		height: 40,
		marginTop: 25,
		marginLeft: 90,
		borderWidth: 2,
		borderColor: 'white',
		borderBottomColor: '#c850c0',
	},
	Contact: {
		width: 265,
		height: 40,
		marginTop: 25,
		marginLeft: 90,
		borderWidth: 2,
		borderColor: 'white',
		borderBottomColor: '#c850c0',
	},
	checkbox: {
		flex: 1,
		padding: 10,
		marginTop: 55,
		marginLeft: 50,
	},
	termsbut: {
		marginLeft: 220,
		marginTop: -20,
		width: 120,
	},
	termstext: {
		marginLeft: 95,
		marginTop: -20,
	},
	termsbutton: {
		width: 122,
		height: 20,
		color: '#FFCC70',
		fontWeight: 'bold',
		fontSize: 14,
		borderWidth: 2,
		borderColor: 'white',

		borderBottomColor: '#FFCC70',
	},
	Signupbut: {
		width: 320,
		height: 42,
		marginTop: 40,
		marginLeft: 40,
		borderWidth: 1,
		borderColor: '#FFCC70',
		backgroundColor: '#FFCC70',
		borderRadius: 5,
	},
	Signuptext: {
		color: 'white',
		paddingLeft: 115,
		paddingTop: 9,
		letterSpacing: 1,
		fontWeight: '700',
		fontSize: 17,
	},
	usernameicon: {
		width: 30,
		height: 30,
		marginTop: -385,
		marginLeft: 35,
	},
	emailicon: {
		width: 25,
		height: 25,
		marginTop: 38,
		marginLeft: 38,
	},
	passwordicon: {
		width: 27,
		height: 27,
		marginTop: 40,
		marginLeft: 36,
	},
	contacticon: {
		width: 30,
		height: 30,
		marginTop: 37,
		marginLeft: 37,
	},
	footer: {
		width: '100%',
		height: 100,
		marginTop: 180,
	},
});
