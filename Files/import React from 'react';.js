import React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	Alert,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

export default class Chatscreen2 extends React.Component {
	constructor(props) {
		super();
		this.state = {
			text: '',
		};
	}
	render() {
		return (
			<KeyboardAvoidingView
				style={styles.KeyboardAvoidingView}
				behavior="height">
				<View style={styles.Maincontainer}>
					<ScrollView>
						<View style={styles.View}>
							<TouchableOpacity>
								<Image
									style={styles.Image}
									source={require('../assets/back.png')}></Image>
							</TouchableOpacity>
							<Text style={styles.TextStyle}>CHAT CAT</Text>
						</View>
					</ScrollView>

					<View style={styles.Sectionstyle}>
						<TextInput
							style={styles.TextInput}
							placeholder="TYPE YOUR MESSAGE HERE.!"
							keyboardType="email-address"
							onChangeText={(text) => this.setState({ text })}
							value={this.state.text}></TextInput>

						<TouchableOpacity>
							<Image
								style={styles.ImageStyle}
								source={require('../assets/send.png')}></Image>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	Maincontainer: {
		flex: 1,
		backgroundColor: '#ECE5DD',
		alignItems: 'center',
		justifyContent: 'center',
	},

	TextInput: {
		borderColor: '#FFF',
		borderWidth: 2,
		width: 330,
		height: 50,
		borderRadius: 25,
		padding: 15,
		marginLeft: 5,
	},

	KeyboardAvoidingView: {
		flex: 1,
		height: 10,
	},

	View: {
		borderColor: '#000',
		width: 395,
		height: 90,
		backgroundColor: '#28324B',
		marginBottom: 570,
	},

	Sectionstyle: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#000',
		width: 395,
		height: 75,
		backgroundColor: '#28324B',
		alignItems: 'center',
	},

	ImageStyle: {
		height: 45,
		width: 45,
		marginLeft: 4,
	},

	TextStyle: {
		fontSize: 30,
		fontWeight: 'bold',
		bottom: 40,
		alignSelf: 'center',
		color: '#fff',
	},

	Image: {
		width: 40,
		height: 40,
		marginLeft: 10,
		marginTop: 45,
	},
});
