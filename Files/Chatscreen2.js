import React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
	Alert,
	ToastAndroid,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
let { height, width } = Dimensions.get('window');

export default class Chatscreen2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			messageList: [],
			groupName: '',
			grp_id: null,
			CurrentUseruid: null,
			cat: [],
		};
	}

	componentDidMount() {
		this.state.CurrentUseruid = firebase.auth().currentUser.uid;
		const idd = this.state.grp_id;
		const mymsg = firebase.database();
		console.log(this.state.CurrentUseruid);
		const uidd = this.state.CurrentUseruid;

		console.log(mymsg.ref('groups/' + idd));
		mymsg
			.ref('groups/' + idd)
			.child('users')

			.once('value')
			.then((data) => {
				const data1 = data.val().member;
				if (data1 != uidd) {
					Alert.alert(
						'You are not a Member',
						'Do you want to join the group???',
						[
							{
								text: 'Cancel',
								onPress: () => this.props.navigation.goBack(),
								style: 'cancel',
							},
							{ text: 'OK', onPress: () => console.log('OK Pressed') },
						],
						{ cancelable: false }
					);
				}
			});

		mymsg
			.ref('messages/')
			.orderByChild('grp_id')
			.equalTo(idd)
			.on('value', (datasnap) => {
				this.setState({ messageList: Object.values(datasnap.val()) });
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
		const a = this.state.groupName;
		const mymsgs = firebase.database().ref('messages');

		let uid = firebase.auth().currentUser.uid;
		this.setState({ text: '' });
		mymsgs.push().set({
			text: this.state.text,
			time: Date.now(),
			senderUID: uid,
			grp_id: this.state.grp_id,
		});
	}

	renderRow = ({ item }) => {
		return (
			<View style={{ flex: 1 }}>
				{firebase.auth().currentUser.uid == item.senderUID ? (
					<View style={styles.eachMsgRight}>
						<View style={styles.msgBlockRight}>
							<Text style={styles.msgTxt}>{item.text}</Text>
							<Text style={styles.msgTime}> {this.convertTime(item.time)}</Text>
							{/* <Text style={styles.userName}>
					{firebase.auth().currentUser.displayName}
				</Text> */}
						</View>
					</View>
				) : (
					<View style={styles.eachMsg}>
						<View style={styles.msgBlock}>
							<Text style={styles.msgTxt}>{item.text}</Text>
							<Text style={styles.msgTime}> {this.convertTime(item.time)}</Text>
							{/* <Text style={styles.userName}>
						{firebase.auth().currentUser.displayName}
					</Text> */}
						</View>
					</View>
				)}
			</View>
		);
	};

	render() {
		this.state.groupName = this.props.route.params.items;
		this.state.grp_id = this.props.route.params.grp_key;
		this.state.cat = this.props.route.params.cat;

		return (
			<View style={{ flex: 1, width: width - 1 }}>
				<FlatList
					data={this.state.messageList}
					renderItem={this.renderRow}
					keyExtractor={(item) => item.time}
				/>
				{console.log(this.item)}

				{/* Message input  */}
				<View style={styles.Sectionstyle}>
					<TextInput
						style={styles.TextInput}
						value={this.state.msg}
						placeholderTextColor="#696969"
						blurOnSubmit={false}
						returnKeyType="send"
						placeholder="Enter your text here"
						keyboardType="email-address"
						clearButtonMode="always"
						onChangeText={(text) => this.setState({ text })}
						value={this.state.text}></TextInput>

					<TouchableOpacity
						onPress={() => {
							if (this.state.text.trim() === '') {
								ToastAndroid.showWithGravityAndOffset(
									"Can't send EMPTY message",
									ToastAndroid.LONG,
									ToastAndroid.CENTER,
									-1,
									10
								);
							} else {
								this.sendMessage();
							}
						}}>
						<Image
							style={styles.ImageStyle}
							source={require('../assets/send.png')}></Image>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row', backgroundColor: '#28324B' }}>
					<Image
						style={styles.IconStyle}
						source={require('../assets/send.png')}></Image>
					<Image
						style={styles.IconStyle}
						source={require('../assets/send.png')}></Image>
					<Image
						style={styles.IconStyle}
						source={require('../assets/send.png')}></Image>
					<Image
						style={styles.IconStyle}
						source={require('../assets/send.png')}></Image>
					<Image
						style={styles.IconStyle}
						source={require('../assets/send.png')}></Image>
					<Image
						style={styles.IconStyle}
						source={require('../assets/send.png')}></Image>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	RoomName: {
		fontSize: 30,
		color: '#fff',
		marginHorizontal: 90,
	},
	NavBar: {
		height: '8%',
		width: width + 10,
		backgroundColor: '#28324B',
		position: 'relative',
		paddingTop: 4,
		flexDirection: 'row',
		alignItems: 'center',
	},
	TextInput: {
		flex: 1,
		borderColor: '#6D1B7B',
		borderWidth: 3,
		width: 300,
		height: 50,
		borderRadius: 50,
		padding: 10,
		position: 'relative',
		marginTop: 10,
		marginLeft: 1,
		backgroundColor: 'white',
	},

	KeyboardAvoidingView: {
		height: 50,
	},

	Sectionstyle: {
		height: 60,
		flexDirection: 'row',
		backgroundColor: '#28324B',
	},

	ImageStyle: {
		height: 45,
		width: 45,
		marginLeft: 5,
		marginTop: 10,
	},
	IconStyle: {
		height: 45,
		width: 45,
		marginLeft: 15,
	},
	eachMsgRight: {
		flexDirection: 'row',
		margin: 5,
		marginLeft: 170,
	},
	msgBlockRight: {
		width: 220,
		borderRadius: 5,
		backgroundColor: '#525A6E',

		padding: 10,
		shadowColor: '#3d3d3d',
		shadowRadius: 2,
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 1,
		},
	},
	eachMsg: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		margin: 5,
	},
	msgBlock: {
		width: 220,
		borderRadius: 5,
		backgroundColor: '#525A6E',
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
		color: '#FCFCFC',
		fontWeight: '600',
	},
	userName: {
		fontSize: 10,
		color: '#555',
		fontWeight: '600',
		position: 'absolute',
		right: 10,
	},
	msgTime: {
		fontSize: 10,
		color: '#FCFCFC',
		fontWeight: '600',
		position: 'absolute',
		right: 10,
		bottom: 5,
	},
	rightTxt: {
		fontSize: 15,
		color: '#202020',
		fontWeight: '600',
	},
});
