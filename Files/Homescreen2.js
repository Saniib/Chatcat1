import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	FlatList,
	KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Feather';
import {
	Provider as PaperProvider,
	Text,
	Searchbar,
	Colors,
	Button,
} from 'react-native-paper';
import Signupscreen from './Signupscreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
let { height, width } = Dimensions.get('window');
export default class Homescreen2 extends React.Component {
	userSignout() {
		firebase
			.auth()
			.signOut()
			.then(() => this.props.navigation.replace('Login'));
		const uid = firebase.auth().currentUser.uid;
	}

	constructor(props) {
		super(props);
		this.state = {
			showCreateGroupDialog: false,
			showCreateGroupDialogLoader: false,
			groupName: null,
			showloader: false,
			groupData: null,
			active: false,
			value: null,
			a: false,
			dbRef: firebase.database().ref('groups/'),
		};
	}
	state = {
		groups: [],
		arrayholder: [],
	};

	componentDidMount() {
		const uid = firebase.auth().currentUser.uid;

		this.state.dbRef.on('value', (snapshot) => {
			var li = [];
			snapshot.forEach((child) => {
				var members = child.val().users.member;
				if (child.hasChild('users')) {
					if (members == uid) {
						li.push({
							key: child.key,
							group_name: child.val().group_name,
							created_at: child.val().created_at,
						});
					}
				} else {
					alert('old code plz update your code' + ++i);
				}
			});
			this.setState({ groups: li });
		});

		this.state.dbRef.on('value', (snapshot) => {
			var lii = [];
			snapshot.forEach((child) => {
				lii.push({
					key: child.key,
					group_name: child.val().group_name,
					created_at: child.val().created_at,
				});
			});
			this.setState({ arrayholder: lii });
		});
	}

	createGroup = (groupName) => {
		if (groupName == null || groupName.trim() === '') {
			Alert.alert(
				'Error',
				'Sorry You didnot given a name for Group you Created'
			);
		} else {
			this.setState({
				showloader: true,
			});

			const datenow = Date.now();
			const uid = firebase.auth().currentUser.uid;
			firebase
				.database()
				.ref('groups')
				.push({
					group_name: groupName,
					created_at: datenow,
					admin_uid: uid,
					users: {
						members: uid,
					},
				})

				.then(() => {
					this.setState({
						showCreateGroupDialog: false,
						showloader: false,
					});
				})
				.catch((error) => {
					alert(error.message);
				});
		}
		this.state.groupName = null;
	};
	renderRow = ({ item }) => {
		console.log(item.created_at);
		return (
			<TouchableOpacity
				style={styles.roombox}
				onPress={() => {
					this.props.navigation.navigate('Chatscreen2', {
						group_name: item.group_name,
						grp_key: item.key,
						cat: item.created_at,
					});
				}}>
				<TouchableOpacity
					style={styles.profile1}
					onPress={() => console.log('==================================')}>
					<Icon name="user" style={{ color: 'white', fontSize: 28 }}></Icon>
				</TouchableOpacity>
				<Text style={styles.roomtext}>{item.group_name}</Text>
			</TouchableOpacity>
		);
	};
	searchFilterFunction = (text) => {
		if (text == null || text.trim() === '') {
			this.state.dbRef.on('value', (snapshot) => {
				var li = [];
				snapshot.forEach((child) => {
					var members = child.val().users.member;
					const uid = firebase.auth().currentUser.uid;
					if (child.hasChild('users')) {
						if (members == uid) {
							li.push({
								key: child.key,
								group_name: child.val().group_name,
								created_at: child.val().created_at,
							});
						}
					} else {
						alert('old code ' + ++i);
					}
				});
				this.setState({ groups: li });
			});
		} else {
			const newData = this.state.arrayholder.filter((item) => {
				const itemData = `${item.group_name.toUpperCase()}`;
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});

			this.setState({
				groups: newData,
			});
		}
	};

	Home = () => {
		const Drawer = createDrawerNavigator();
		return (
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Signupscreen">
					<Drawer.Screen name="Signupscreen" component={Signupscreen} />
				</Drawer.Navigator>
			</NavigationContainer>
		);
	};
	render() {
		const Item = ({ item, onPress }) => (
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.title}>{item.title}</Text>
			</TouchableOpacity>
		);
		const Drawer = createDrawerNavigator();
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Signupscreen">
				<Drawer.Screen name="Signupscreen" component={Signupscreen} />
			</Drawer.Navigator>
		</NavigationContainer>;
		return (
			<PaperProvider>
				<View style={styles.MainContainer}>
					<View style={styles.Box}>
						<TouchableOpacity style={styles.TouchableOpacity}>
							<Icon name="arrow-left" style={styles.BackIcon}></Icon>
						</TouchableOpacity>

						<Text style={styles.Text}>CHAT CAT</Text>
					</View>

					<View style={styles.SmallBox}></View>

					<View style={styles.SmallBox1}></View>
				</View>
				<View style={styles.SearchBox}>
					{
						<Searchbar
							placeholder="SEARCH FOR....!"
							style={{
								borderRadius: 30,
								borderWidth: 2,
								borderColor: '#28324B',
							}}
							onChangeText={(text) => this.searchFilterFunction(text)}
						/>
					}
				</View>
				<Button onPress={() => this.Home()} title="Go to notifications" />
				<View style={styles.container}>
					<View>
						<FlatList
							data={this.state.groups}
							extraData={this.state.arrayholder}
							renderItem={this.renderRow}
							keyExtractor={(item) => item.key}
						/>
					</View>
				</View>
				<KeyboardAvoidingView>
					<TouchableOpacity
						style={styles.LogoutButton}
						onPress={() => {
							this.userSignout();
						}}>
						<Text style={styles.Buttontext}>LOG OUT</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</PaperProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		backgroundColor: '#fff',
	},

	LogoutButton: {
		width: 70,
		height: 40,
		borderRadius: 5,
		left: 20,
		bottom: 0,
		margin: 20,
		position: 'absolute',
		backgroundColor: '#C850C0',
	},
	MainContainer: {
		backgroundColor: '#fff',
	},

	Box: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#000',
		backgroundColor: '#28324B',
		height: 75,
		alignItems: 'center',
	},

	Text: {
		fontSize: 30,
		fontWeight: 'bold',
		top: 5,
		color: '#fff',
		paddingLeft: 75,
	},

	SmallBox: {
		backgroundColor: '#FBDE44',
		height: 15,
	},

	SmallBox1: {
		backgroundColor: '#F65158',
		height: 15,
	},

	SearchBox: {
		marginTop: 5,
		width: width - 5,
		alignSelf: 'center',
	},

	BackIcon: {
		width: 30,
		height: 30,
		fontSize: 30,
		color: 'white',
		marginLeft: 10,
	},

	Buttontext: {
		top: 10,
		left: 5,
		color: '#FFCC70',
		fontWeight: 'bold',
	},

	ChatcatText: {
		fontSize: 25,
		marginLeft: 295,
		marginTop: -47,
		color: '#FFCC70',
		fontWeight: 'bold',
	},

	roombox: {
		width: width - 10,
		height: 45,
		borderBottomWidth: 2,
		borderBottomColor: '#6D1B7B',
		marginTop: 13,
		marginBottom: 9,
		borderRadius: 20,
	},
	roomtext: {
		marginLeft: 80,
		marginTop: -28,
		paddingEnd: 15,
		fontSize: 20,
		fontWeight: '700',
		fontFamily: 'Roboto',
		//textAlignVertical: 'center',
	},

	profile1: {
		width: 38,
		height: 36,
		marginTop: 4,
		alignItems: 'center',
		alignContent: 'center',
		marginLeft: 15,
		backgroundColor: '#28324B',
		borderWidth: 1,
		borderRadius: 20,
	},
});
