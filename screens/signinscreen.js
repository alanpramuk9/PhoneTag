import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, View, Dimensions } from 'react-native';
import App from '../App';

import * as userService from '../services/users';


export default class SignUpScreen extends Component {
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


    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <App />
            )
        }



        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Enter Your Email</Label>
                            <Input onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Enter Your Password</Label>
                            <Input onChangeText={(text) => this.setState({ password: text })} />
                        </Item>
                    </Form>
                    <Button onPress={() => this.signup()} block style={{ margin: 15, marginTop: 50 }}>
                        <Text>SIGN IN</Text>
                    </Button>
                </Content>
            </Container>
        )
    }


}
