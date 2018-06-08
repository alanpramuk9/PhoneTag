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
                        style ={{ marginTop: 50, marginBottom: 60}}source={require('../images/jellybean3.png')}
                    />
                    
                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Text style={{ color: 'black', fontSize: 30, fontFamily: Fonts.TCB}}>Sign In</Text>
                    </Button>
                    <Button style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={{ color: 'black', fontSize: 30, fontFamily: Fonts.TCB}}>Sign Up</Text>
                    </Button>
                </Content>
                <Footer style={styles.footer}>
                    <Button style={{ backgroundColor: '#4054b2', alignSelf: 'flex-end'}} onPress={() => this.props.navigation.navigate('About')}>
                        <Text style={{ fontSize: 20, fontFamily: Fonts.TCB}}>About Jelly Drop</Text>
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
        marginBottom: 100,
        alignSelf: 'center',
        backgroundColor: '#00FF72',
        borderColor: 'black',
        borderRadius: 25,
        borderWidth: 7,
        
    },
    title: {
        fontSize: 50,
    },
    footer: {
        backgroundColor: '#4054b2'
    }


})