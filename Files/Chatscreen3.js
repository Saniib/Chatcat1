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
} from 'react-native';
import firebase from 'firebase';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'native-base';
let { height, width } = Dimensions.get('window');
export default class Chatscreen3 extends React.Component {
	state = { text: '', messageList: [] };

	componentDidMount() {
		this.state.CurrentUseruid = firebase.auth().currentUser.uid;
		const idd = this.state.grp_id;
		const mymsg = firebase.database();
		mymsg
			.ref('messages')
			.orderByChild('grp_id')
			.equalTo(idd)
			.on('value', (datasnap) => {
				this.setState({ messageList: Object.values(datasnap.val()) });
			});

		mymsg
			.ref('groups')
			.child(idd + '/users/')
			.set({
				member: this.state.CurrentUseruid,
			});
	}

	convertTime = (time) => {
		let d = new Date(time);
		let c = new Date();
		let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
		result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
		if (c.getDay() !== d.getDay()) {
			result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
		}
		return result;
	};
	sendMessage() {
		const mymsgs = firebase.database().ref('messages');
		mymsgs.push().set({
			text: this.state.text,
			time: Date.now(),
		});
		this.setState({ text: '' });
	}

	renderRow = ({ item }) => {
		return (
			<View style={styles.eachMsg}>
				<View style={styles.msgBlock}>
					<Text style={styles.msgTxt}>{item.text}</Text>
					<Text style={styles.msgTime}> {this.convertTime(item.time)}</Text>
				</View>
			</View>
		);
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.messageList}
					renderItem={this.renderRow}
					keyExtractor={(item) => item.key}
				/>
				<View style={styles.Sectionstyle}>
					<TextInput
						style={styles.TextInput}
						ref={(ref) => {
							flatlistRef = ref;
						}}
						value={this.state.msg}
						extraData={this.state.refresh}
						placeholderTextColor="#696969"
						blurOnSubmit={false}
						onSubmitEditing={() => this.sendMessage()}
						returnKeyType="send"
						placeholder="TYPE YOUR MESSAGE HERE.!"
						keyboardType="email-address"
						onContentSizeChange={(contentWidth, contentHeight) => {
							flatlistRef.scrollToEnd({ animated: true });
						}}
						onLayout={() => {
							flatlistRef.scrollToEnd({ animated: true });
						}}
						onChangeText={(text) => this.setState({ text })}
						value={this.state.text}></TextInput>

					<TouchableOpacity onPress={() => this.sendMessage()}>
						<Image
							style={styles.ImageStyle}
							source={require('../assets/send.png')}></Image>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	Maincontainer: {},
	TextInput: {
		flex: 1,
		borderColor: '#6D1B7B',
		borderWidth: 3,
		width: 300,
		height: 50,
		borderRadius: 10,
		padding: 10,
		position: 'relative',
		marginBottom: 10,
		marginLeft: 1,
	},

	KeyboardAvoidingView: {
		height: 50,
	},

	Sectionstyle: {
		flexDirection: 'row',
	},

	ImageStyle: {
		height: 45,
		width: 45,
		marginLeft: 5,
	},

	eachMsg: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		margin: 5,
	},
	msgBlock: {
		width: 220,
		borderRadius: 5,
		backgroundColor: '#ffffff',
		padding: 10,
		shadowColor: '#3d3d3d',
		shadowRadius: 2,
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 1,
		},
	},
	rightBlock: {
		width: 220,
		borderRadius: 5,
		backgroundColor: '#97c163',
		padding: 10,
		shadowColor: '#3d3d3d',
		shadowRadius: 2,
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 1,
		},
	},
	msgTxt: {
		fontSize: 15,
		color: '#555',
		fontWeight: '600',
	},
	msgTime: {
		fontSize: 10,
		color: '#555',
		fontWeight: '600',
		position: 'absolute',
		right: 10,
	},
	rightTxt: {
		fontSize: 15,
		color: '#202020',
		fontWeight: '600',
	},
});
