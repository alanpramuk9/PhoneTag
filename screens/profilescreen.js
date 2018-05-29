import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1 } from 'native-base';
import * as usersService from '../services/users';



export default class ProfileScreen extends Component {
        constructor(props) {
            super(props);
            this.state = {
                player: ''
            };
        }

        componentWillMount() {
            usersService.profile()
            .then((player) => {
                this.setState({ player });
                console.log(this.state.player);
            }).catch((err) => {
                console.log(err);
            })
        }

    render() {
        let playerInfo = this.state.player;
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1,
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between'}}>
                    
                        <Button style={{ alignSelf: 'flex-start' }} onPress={() => this.props.navigation.navigate('Settings', { playerInfo })}>
                        <Icon name="ios-settings-outline" />
                        </Button>
                        <H1>Profile</H1>
                        <Button style={{ alignSelf: 'flex-start' }} onPress={() => this.props.navigation.navigate('SignedOut')}>
                            <Text>Log Out</Text>
                        </Button>
                </Content>
                <Content contentContainerStyle={{ flex: 1,
                                                  flexDirection: 'column',
                                                  justifyContent: 'flex-start',
                                                  alignItems: 'center'}}>
                        
                        <View><Image source={require('../images/bird.jpg')} style={{height: 100, width: 100, flex: 0}}/>
                        </View>

                
                </Content>
            </Container>
        )
    }


}

const styles = StyleSheet.create({
    photo: {
      alignSelf: "center",
      justifyContent: "center"
    }
  });