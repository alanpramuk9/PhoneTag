import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1 } from 'native-base';

export default class AboutScreen extends Component {
    static navigationOptions = {
        title: "About",
        headerStyle: {backgroundColor: '#4054b2'}
    }
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1,
                                                  flexDirection: 'column',
                                                  justifyContent: 'space-between'}}>

                    <ScrollView>
                        <View style={{}}><Image source={require('../images/fake_logo.png')} /></View>
                        <View style={{alignSelf: 'center'}}><Image source={require('../images/fake_dashboard.png')}/></View>
                        <H1 style={styles.H1}>Rules of Phone Tag!</H1>
                        <View style={styles.color}>
                            <View style={styles.rules}>
                                <Text>- Each player gets an initial 20 pins to place each day!</Text>
                                <Text>- Traverse the map and place your pins. (2pts)</Text>
                                <Text>- As you travel pick up the pins of other players. (24pts)</Text>
                                <Text>- You can drop any pins you pick up that day in addition to your 20.</Text>
                                <Text><Text style={styles.bold}>Daily Bonus:</Text> Drop 20 pins in one day! (100pts)</Text>
                                <Text><Text style={styles.bold}>Weekly Bonus #1:</Text> If you have 105 of your dropped pins picked up in one week you will receive an
                                    additional 6pts to every pin you picked up that week. (30pts for each pin)</Text>
                                <Text><Text style={styles.bold}>Weekly Bonus #2:</Text> If you have 140 of your dropped pins picked up in one week you will recieve an
                                    additoinal 6pts to every pin you picked up taht week. (36pts for each pin)</Text>
                            </View>
                        </View>
                    </ScrollView>
                            {/* <Image source={require(fake_dashboard)} />; */}

                </Content>
                <Footer>
                <Button style={{ alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text>Sign Up</Text>
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
      marginLeft: 5,
      marginRight: 5
    },
    color: {
      backgroundColor: '#BEC1D4',
    },
    bold: {
      fontWeight: '700',
    }
  });