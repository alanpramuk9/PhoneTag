import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import App from '../App';

import * as userService from '../services/users';
import { Fonts } from '../utility/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            feedbackMessage: '',
            name: '',
            email: '',
            username: '',
            password: ''
        };
    }

    signup() {
        userService.newUser(this.state.name, this.state.email, this.state.username, this.state.password)
            .then(() => {
               return userService.login(this.state.email, this.state.password)
            }).then(() => {
                this.props.navigation.navigate('Map', {});
            })
            .catch((err) => {
                if (err.message) {
                    this.setState({ feedbackMessage: err.message });
                }
            });
    }


    render() {

        return (
            <Container style={styles.container}>
            <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}  >
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', paddingTop: 20}}>
                    <View><Text style={{fontSize:60, textAlign: 'center', fontFamily: Fonts.IndieFlower}}>Jelly Drop</Text></View>
                    {/* <View><Text style={{textAlign: 'center' }}>Lorem ipsum dolor sit amet, cu modus falli mea. </Text></View> */}
                  </View>
             
              <View style={{ flex:1}}>
                  <Form>
                  <Item > 
                      <Icon active name="person" />
                      <Input placeholder="Name" onChangeText={(text) => this.setState({ name: text })} />
                    </Item>
                  <Item > 
                      <FontAwesome style={{color: 'black',  fontSize: 20}} active name="envelope" />
                      <Input placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
                    </Item>
                    <Item>
                      <FontAwesome style={{color: 'black', fontSize: 20}}  active name="gamepad" />
                      <Input placeholder="Username" onChangeText={(text) => this.setState({ username: text })} />
                    </Item>
                    <Item>
                      <Icon active name="lock" />
                      <TextInput style={{width: 150}} underlineColorAndroid='transparent' secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({password: text})}/>
                    </Item>
                    <Button onPress={() => this.signup()} block style={{ margin: 15, marginTop: 20 }}>
                    <Text>Sign Up</Text>
                  </Button>
                  </Form>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20}}>
                    <View><Text style={{fontSize:15}}>Sign In</Text></View>
                    <View><Text style={{fontSize:15}}>Forgot password? </Text></View>
                  </View>   
              </View>
              <View style={{ flex:1}}></View>
                
    
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
      flex:1, 
      backgroundColor: 'blue' 
    }
  });
