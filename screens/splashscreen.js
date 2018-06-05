import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { AppRegistry, View, Image } from 'react-native';

export default class SplashScreen extends Component {

    // static navigationOptions = {
    //     header: "none"
    // }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
                    <Text>Jelly Drop</Text>
                    <Image
                        source={require('../images/jellybean.png')}
                        />
                    <Button style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Text>Sign In</Text>
                    </Button>
                    <Button style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text>Sign Up</Text>
                    </Button>
                </Content>
                <Footer>
                    <Button style={{ alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('About')}>
                            <Text>Aboout Phone Tag!</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }


}
