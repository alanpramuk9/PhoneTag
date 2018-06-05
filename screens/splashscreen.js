import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { AppRegistry, View, Image, StyleSheet } from 'react-native';

import { Fonts } from '../utility/fonts';
export default class SplashScreen extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center', flex: 1, backgroundColor: '#81BCFF' }}>
                    <Image
                        source={require('../images/jellybean2.png')}
                    />
                    
                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Text style={{ color: 'black', fontSize: 30, fontFamily: 'EvilIcons'}}>Sign In</Text>
                    </Button>
                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={{ color: 'black', fontSize: 30}}>Sign Up</Text>
                    </Button>
                </Content>
                <Footer style={styles.footer}>
                    <Button style={{ backgroundColor: '#464C8A', alignSelf: 'flex-end'}} onPress={() => this.props.navigation.navigate('About')}>
                        <Text style={{ fontSize: 15, fontWeight: '600'}}>About Phone Tag</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    button: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 30,
        paddingBottom: 30,
        alignSelf: 'center',
        backgroundColor: '#00FF72',
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 10,
        
    },
    title: {
        fontSize: 50,
    },
    footer: {
        backgroundColor: '#464C8A'
    }


})