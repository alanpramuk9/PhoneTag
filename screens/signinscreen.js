import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import App from '../App';
import * as userService from '../services/users';
import { Fonts } from '../utility/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackMessage: '',
            email: '',
            password: ''
        };
    }

    signup() {
        console.log('Clicked the SignIn Button')
        userService.login(this.state.email, this.state.password)
            .then(() => {
                console.log('made it through the login process, about to change redirectToReferrer to true')
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
            backgroundColor: '#4054b2'
        }
    }

    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <App />
            )
        }
        return (
            <Container style={styles.container} >
                <Content padder style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', paddingTop: 20 }}>
                        <View><Text style={{ fontSize: 40, textAlign: 'center', fontFamily: Fonts.TCB }}>Welcome Back!</Text></View>
                        <Image
                            style={{ marginTop: 30, alignSelf: 'center' }} source={require('../images/jellybeansmedium.png')}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Form style={{ marginBottom: 10 }}>
                            <Item >
                                <FontAwesome style={{ color: '#4054b2', fontSize: 20 }} active name="envelope" />
                                <Input placeholderTextColor='black' placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
                            </Item>
                            <Item>
                                <Icon active name="lock" style={{ color: '#4054b2' }} />
                                <TextInput placeholderTextColor='black' style={{ width: 150 }} underlineColorAndroid='transparent' secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} />
                            </Item>
                        </Form>
                        <Button onPress={() => this.signup()} block style={styles.button}>
                            <Text style={{ color: 'black', fontSize: 30, fontFamily: Fonts.TCB }}>SIGN IN</Text>
                        </Button>
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
        // paddingLeft: 40,
        // paddingRight: 40,
        // paddingTop: 20,
        // paddingBottom: 20,
        marginBottom: 15,
        height: 80,
        alignSelf: 'center',
        backgroundColor: '#00FF72',
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 5,

    }
});
