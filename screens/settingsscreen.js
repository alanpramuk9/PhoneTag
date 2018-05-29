import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


export default class SettingsScreen extends Component {


    render() {
        return (
            <Container>
                <Content>
                    <Text>This is the settings screen</Text>
                </Content>
            </Container>
        )
    }


}