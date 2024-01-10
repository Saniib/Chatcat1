import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	FlatList,
	Alert,
} from 'react-native';
import firebase from 'firebase';
import {
	Button,
	Dialog,
	FAB,
	Portal,
	Provider as PaperProvider,
	TextInput,
	ActivityIndicator,
	Colors,
	IconButton,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default class Homescreen extends React.Component {
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
			groupKey: null,
			groups: [],
		};
	}

	componentDidMount() {
		const uid = firebase.auth().currentUser.uid;
		firebase
			.database()
			.ref('groups/')
			.on('value', (snapshot) => {
				var li = [];
				var i = 0;
				snapshot.forEach((child) => {
					console.log('========================================');
					console.log('========================================');
					console.log(child.hasChild('users'));

					if (child.hasChild('users')) {
						var members = child.val().users.member;
						console.log(child.val().group_name);
						if (members == uid) {
							li.push({
								key: child.key,
								group_name: child.val().group_name,
							});
						}
					} else {
						alert('old code ' + ++i);
					}
				});
				this.setState({ groups: li });
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
						member: uid,
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
		return (
			<TouchableOpacity
				style={styles.roombox}
				onPress={() => {
					this.props.navigation.navigate('Chatscreen2', {
						group_name: item.group_name,
						grp_key: item.key,
					});
				}}>
				<TouchableOpacity
					style={styles.profile1}
					onPress={() => console.log()}></TouchableOpacity>
				<Text style={styles.roomtext}>{item.group_name}</Text>
			</TouchableOpacity>
		);
	};

	render() {
		const { showCreateGroupDialog, groupName, showloader } = this.state;
		const Item = ({ item, onPress, style }) => (
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.title}>{item.title}</Text>
			</TouchableOpacity>
		);
		var user = firebase.auth().currentUser;
		if (user != null) {
			user.providerData.forEach(function (profile) {
				console.log('Sign-in provider: ' + profile.providerId);
				console.log('  Provider-specific UID: ' + profile.uid);
				console.log('  Name: ' + profile.displayName);
				console.log('  Email: ' + profile.email);
			});
		}
		return (
			<PaperProvider>
				<ScrollView>
					<TouchableOpacity
						style={styles.drawerItem}
						onPress={() => {
							this.props.navigation.navigate('Home');
							this.props.navigation.closeDrawer();
						}}>
						<Text style={styles.drawerText}>Home</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.drawerItem}
						onPress={() => {
							this.props.navigation.navigate('TabA');
							this.props.navigation.closeDrawer();
						}}>
						<Text style={styles.drawerText}>Tab-A</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.drawerItem}
						onPress={() => {
							this.props.navigation.navigate('TabB');
							this.props.navigation.closeDrawer();
						}}>
						<Text style={styles.drawerText}>Tab-B</Text>
					</TouchableOpacity>
				</ScrollView>
				<View style={styles.container}>
					<View style={styles.head}>
						<IconButton
							icon="menu"
							color="#FFCC70"
							size={33}
							onPress={() => {
								'Settingscreen';
							}}
							style={styles.menubutton}
						/>

						<Text style={styles.ChatcatText}>ChatCat</Text>
					</View>
					<View>
						<ScrollView>
							<FlatList
								data={this.state.groups}
								renderItem={this.renderRow}
								keyExtractor={(item) => item.key}
							/>
						</ScrollView>
					</View>
					<Text style={{ justifyContent: 'center', fontSize: 30 }}></Text>

					<TouchableOpacity
						style={styles.LogoutButton}
						onPress={() => {
							this.userSignout();
						}}>
						<Text style={styles.Buttontext}>LOG OUT</Text>
					</TouchableOpacity>
					<Text>{this.props.uid}</Text>
					<FAB
						style={styles.fab}
						icon="plus"
						color="#FFCC70"
						label="Create Group"
						onPress={() => this.setState({ showCreateGroupDialog: true })}
					/>

					<Portal>
						<Dialog
							dismissable={showloader == true ? false : true}
							visible={showCreateGroupDialog}
							onDismiss={() => {
								this.setState({ showCreateGroupDialog: false });
							}}>
							<Dialog.Title>Create Group </Dialog.Title>
							<Dialog.Content>
								<TextInput
									disabled={showloader}
									mode="flat"
									placeholder="Enter Group Name"
									value={this.state.groupName}
									onChangeText={(groupName) => {
										this.setState({ groupName });
									}}
								/>
							</Dialog.Content>
							<Dialog.Actions>
								{showloader == true ? (
									<ActivityIndicator
										size="large"
										animating={true}
										color="#C850C0"
									/>
								) : (
									<Button onPress={() => this.createGroup(groupName)}>
										Done
									</Button>
								)}
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>
			</PaperProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: '#fff',
	},
	menubutton: {
		left: -3,
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
	Buttontext: {
		top: 10,
		left: 5,
		color: '#FFCC70',
		fontWeight: 'bold',
	},
	head: {
		width: 420,
		height: 60,
		backgroundColor: '#C850C0',
	},
	ChatcatText: {
		fontSize: 25,
		marginLeft: 295,
		marginTop: -47,
		color: '#FFCC70',
		fontWeight: 'bold',
	},
	roombox: {
		width: 320,
		height: 45,
		marginLeft: 30,
		borderWidth: 1,
		borderColor: '#FFCC70',
		marginTop: 20,
		marginRight: 20,
		borderRadius: 22,
	},
	roomtext: {
		marginLeft: 60,
		marginTop: -28,
		fontSize: 15,
	},
	profile1: {
		width: 38,
		height: 36,
		marginTop: 4,
		marginLeft: 7,
		borderColor: '#C850C0',
		borderWidth: 1,
		borderRadius: 20,
	},

	profile2: {
		width: 38,
		height: 36,
		marginTop: 4,
		marginLeft: 7,
		borderColor: '#C850C0',
		borderWidth: 1,
		borderRadius: 20,
	},

	plustext: {
		marginLeft: 10,
		marginTop: -13,
		fontSize: 50,
		color: '#FFCC70',
		fontWeight: 'bold',
	},

	fab: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		margin: 20,
		backgroundColor: '#c850c0',
	},
	Reffab: {
		position: 'absolute',
		left: 20,
		bottom: 0,
		margin: 20,
		backgroundColor: '#c850c0',
	},
});
