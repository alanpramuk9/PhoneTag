import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import App from '../App';
import * as gameService from '../services/game';
import * as playergameService from '../services/playergame';
import * as userService from '../services/users';
import { Fonts } from '../utility/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            feedbackMessage: '',
            name: '',
            email: '',
            username: '',
            password: '',
            game_id: null
        };
    }

    componentDidMount() {
        gameService.findGames()
            .then((games) => {
                let currentGameId = games[games.length - 1].id;
                this.setState({ game_id: currentGameId })
            })
    }

    signup() {
        userService.newUser(this.state.name, this.state.email, this.state.username, this.state.password)
            .then(() => {
                return userService.login(this.state.email, this.state.password)
            }).then(() => {
                userService.me()
                    .then((newUser) => {
                        let player_id = newUser.id;
                        playergameService.addPlayergame(player_id, this.state.game_id)
                    })
            }).then(() => {
                this.props.navigation.navigate('Map', {});
            })
            .catch((err) => {
                if (err.message) {
                    this.setState({ feedbackMessage: err.message });
                }
            });
    }

    static navigationOptions = {
        title: 'Back',
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#464C8A'
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}  >
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 5 }}>
                        <Text style={{ fontSize: 40, textAlign: 'center', fontFamily: Fonts.TCB }}>New to Jelly Drop?</Text>
                        <Image
                            style={{ marginTop: 30, alignSelf: 'center' }} source={require('../images/jellybeansmedium.png')}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-start', marginBottom: 220 }}>
                        <KeyboardAvoidingView style={styles.avoidingView} enabled>
                            <Form style={{ marginBottom: 15 }}>
                                <Item >
                                    <Icon style={{ color: '#4054b2' }} active name="person" />
                                    <Input placeholderTextColor='black' placeholder="Name" onChangeText={(text) => this.setState({ name: text })} />
                                </Item>
                                <Item >
                                    <FontAwesome style={{ color: '#4054b2', fontSize: 20 }} active name="envelope" />
                                    <Input placeholderTextColor='black' placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
                                </Item>
                                <Item>
                                    <FontAwesome style={{ color: '#4054b2', fontSize: 20 }} active name="gamepad" />
                                    <Input placeholderTextColor='black' placeholder="Username" onChangeText={(text) => this.setState({ username: text })} />
                                </Item>
                                <Item>
                                    <Icon active name="lock" style={{ color: '#4054b2' }} />
                                    <TextInput placeholderTextColor='black' style={{ width: 150 }} underlineColorAndroid='transparent' secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} />
                                </Item>
                            </Form>
                            <Button onPress={() => this.signup()} block style={styles.button}>
                                <Text style={{ color: 'black', fontSize: 30, fontFamily: Fonts.TCB }}>SIGN UP</Text>
                            </Button>
                        </KeyboardAvoidingView>
                    </View>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#81BCFF"
    },
    main: {
        flex: 1,
        backgroundColor: 'blue'
    },
    button: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 15,
        alignSelf: 'center',
        backgroundColor: '#00FF72',
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 5,
    },
    avoidingView: {
        backgroundColor: "#81BCFF",
    }
});
