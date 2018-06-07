import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1 } from 'native-base';

import { Fonts } from '../utility/fonts';


export default class AboutScreen extends Component {
    static navigationOptions = {
        title: "About",
        headerTintColor: '#ffffff',
        headerStyle: {backgroundColor: '#464C8A'}
    }
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1,
                                                  flexDirection: 'column',
                                                  justifyContent: 'space-between',
                                                  backgroundColor: '#81BCFF'}}>

                    <ScrollView>
                        <View style={{alignSelf: 'center', marginTop: 10}}><Image source={require('../images/fake_dashboard.png')}/></View>
                        <H1 style={{fontFamily: Fonts.TCB, textAlign: 'center', marginBottom: 10, marginTop: 10 }}>How To Play</H1>
                        <View style={styles.color}>
                            <View style={styles.rules}>
                                <Text style={{ fontSize: 35, fontFamily: Fonts.TCB, marginBottom: 15, textAlign: 'center' }}>Every Day, you get 20 Jellies.</Text>
                                <Text style={{ fontSize: 25,  marginBottom: 15, textAlign: 'center' }}><Text style={{ fontSize: 25, fontFamily: Fonts.TCB, marginBottom: 9, textDecorationLine: 'underline'}}>2 POINTS:</Text> Walk around and drop them (you don't like that flavor)</Text>
                                <Text style={{ fontSize: 25,  marginBottom: 15, textAlign: 'center' }}><Text style={{ fontSize: 25, fontFamily: Fonts.TCB, marginBottom: 9, textDecorationLine: 'underline'}}>24 POINTS:</Text> Pick up other Jellies! Now you have one more to drop (don't be selfish)</Text>
                                <Text style={{ fontSize: 25,  marginBottom: 15, textAlign: 'center' }}><Text style={{ fontSize: 25, fontFamily: Fonts.TCB, marginBottom: 9, textDecorationLine: 'underline'}}>DAILY BONUS:</Text> Drop 20 Jellies in one day! (100pts)</Text>
                                <Text style={{ fontSize: 25,  marginBottom: 15, textAlign: 'center' }}><Text style={{ fontSize: 25, fontFamily: Fonts.TCB, marginBottom: 9, textDecorationLine: 'underline'}}>WEEKLY BONUS #1:</Text> If 75% of your Jellies get picked up, you get 6 more points for every Jelly picked up that week.</Text>
                                <Text style={{ fontSize: 25,  marginBottom: 15, textAlign: 'center' }}><Text style={{ fontSize: 25, fontFamily: Fonts.TCB, marginBottom: 9, textDecorationLine: 'underline'}}>WEEKLY BONUS #2:</Text> If 100% of your Jellies get picked, you get ANOTHER 6 points for each Jelly picked up that week.</Text>
                            </View>
                        </View>
                    </ScrollView>
                            {/* <Image source={require(fake_dashboard)} />; */}

                </Content>
                <Footer style={styles.footer}>
                <Button style={{ alignSelf: 'center', backgroundColor: '#464C8A' }} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={{ fontSize: 20, fontFamily: Fonts.TCB}}>Sign Up</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }


}
const styles = StyleSheet.create({
    H1: {
      textAlign: "center",
      marginTop: 10,
      marginBottom: 5
    },
    rules: {
      marginLeft: 3,
      marginRight: 3
    },
    color: {
      backgroundColor: '#93e4ff',
    },
    bold: {
      fontWeight: '700',
    },
    footer: {
        backgroundColor: '#464C8A'
    }
  });