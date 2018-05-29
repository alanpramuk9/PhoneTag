import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


export default class ProfileScreen extends Component {
    static navigationOptions = {
        title: "Profile",
        headerStyle: {backgroundColor: '#4054b2'}
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1,
                                                  flexDirection: 'column',
                                                  justifyContent: 'space-between'}}>
                    <View>
                        <Button style={{ alignSelf: 'flex-start' }} onPress={() => this.props.navigation.navigate('Settings')}>
                        <Icon name="ios-settings-outline" />
                        </Button>
                        <Button style={{ alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('SignedOut')}>
                            <Text>Log Out</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }


}