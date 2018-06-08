import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Label, Input, Form, Textarea } from 'native-base';
import { StyleSheet, View, Dimensions, Modal, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';

import * as contactService from '../services/contactService';
import * as userService from '../services/users';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SwitchToggle from 'react-native-switch-toggle';


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.navigation.state.params.playerInfo.id,
            name: '',
            email: '',
            message: '',
            password: '',
            newpassword: '',
            modalOneVisible: false,
            modalTwoVisible: false,
            modalThreeVisible: false,
            switchOn1: false,
            switchOn2: false,
        }
    }


    setModalOneVisible(visible) {
        this.setState({ modalOneVisible: visible });
    }

    setModalTwoVisible(visible) {
        this.setState({ modalTwoVisible: visible });
    }

    setModalThreeVisible(visible) {
        this.setState({ modalThreeVisible: visible });
    }


    changeEmail() {
        userService.editEmail(this.state.id, this.state.email)
            .then((result) => {
                this.setModalOneVisible(!this.state.modalOneVisible);
                this.props.navigation.navigate('Profile', {});
            }).catch((err) => {
                console.log(err);
            });
    };

    changePassword() {
        userService.checkPassword(this.state.id, this.state.password)
            .then((result) => {
                if (result) {
                    userService.editPassword(this.state.id, this.state.newpassword)
                        .then((result) => {
                            this.setModalOneVisible(!this.state.modalOneVisible);
                            this.props.navigation.navigate('Profile', {});
                        }).catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log('PREVIOUS PASSWORD IS INCORRECT');
                }
            }).catch((err) => {
                console.log(err);
            });
    };


    sendEmail() {
        contactService.sendContactEmail(this.state.name, this.state.email, this.state.message)
            .then((result) => {
                Alert.alert(
                    'Thanks for your feedback!',
                    'We like totally care and stuff',
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.setModalOneVisible(!this.state.modalOneVisible);
                                this.props.navigation.navigate('Profile', {});
                            }
                        },
                    ],
                    { cancelable: false }
                )
            }).catch((err) => {
                console.log(err);
            });

    }

    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
    }
    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
    }
    onPress3 = () => {
        this.setState({ switchOn3: !this.state.switchOn3 });
    }
    
    render() {
        const player = this.props.navigation.state.params.playerInfo;
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    {/* <View style={{ alignSelf: 'center', marginTop: 40, marginBottom: 5 }}><Text style={{ fontSize: 50, textDecorationLine: 'underline' }}>Settings</Text></View> */}

                    <View style={{flex:1}}>
                            <Text style={{fontSize: 25, textAlign: 'center'}}> Profile Information: </Text>
                            
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start' }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start'}} > 
                                    <Icon style={{ color: 'black', fontSize: 20, marginLeft:15 }} name="person" />
                                    <Text style={{  }}>Player Name: {`${player.name}`}</Text>
                                </View>
                                <Text style={{flex: 1}}> </Text>
                                
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start' }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start'}} > 
                                    <FontAwesome style={{ color: 'black', fontSize: 20, marginLeft:15 }} name="envelope" />
                                    <Text style={{  }}>Email: {`${player.email}`}</Text>
                                </View>
                                <Text style={{flex: 1}}> </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start' }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start'}} > 
                                    <FontAwesome style={{ color: 'black', fontSize: 20, marginLeft:15 }} name="gamepad" />
                                    <Text style={{ }}>Username: {`${player.email}`} </Text>
                                </View>
                                <Text style={{flex: 1}}> </Text>
                            </View>
                           
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start', paddingRight: 15 }}>
                             <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start'}} > 
                                <FontAwesome style={{ color: 'black', fontSize: 20, marginLeft:15  }} name="bell" />
                                <Text> Push Notifications </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                <SwitchToggle
                                    switchOn={this.state.switchOn1}
                                    onPress={this.onPress1}
                                    backgroundColorOn={'#add8e6'}	
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start', paddingRight: 15 }}>
                            <FontAwesome style={{ color: 'black', fontSize: 20, marginLeft:15  }} name="comment" />
                            <Text> Email me updates</Text>
                            <View>
                                <SwitchToggle
                                    switchOn={this.state.switchOn1}
                                    onPress={this.onPress2}
                                    backgroundColorOn={'#add8e6'}	
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start', paddingRight: 15 }} >
                            <FontAwesome style={{ color: 'black', fontSize: 20, marginLeft:15  }} name="volume-up" />
                            <Text> Sounds</Text>
                            <View>
                                <SwitchToggle
                                    switchOn={this.state.switchOn1}
                                    onPress={this.onPress3}
                                    backgroundColorOn={'#add8e6'}	
                                />
                            </View>
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start' }}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start'}} > 
                                <FontAwesome style={{ color: 'black', fontSize: 20, marginLeft:15 }} name="info-circle" />
                                <Text> About Game </Text>
                            </View>
                            <View style={{flex: 1, paddingRight: 15}}>
                                <FontAwesome style={{ color: 'black', fontSize: 20, marginLeft:15 }} name="angle-right" />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start' }}>
                            <Icon style={{ color: 'black', fontSize: 20, marginLeft:15 }} name="list" />
                            <Text> Privacy Policy </Text>
                            <FontAwesome style={{ color: 'black', fontSize: 20 }} name="angle-right" />
                        </View>

                       

                        {/* Change Email -------------------------------------------------------- */}
                        <View style={{ marginTop: 22}}>


                            <Modal
                                animationType="fade"
                                transparent={false}
                                visible={this.state.modalOneVisible}
                                onRequestClose={() => {
                                    this.setModalOneVisible(!this.state.modalOneVisible);
                                }}>
                                <View style={{ marginTop: 22, backgroundColor: "#81BCFF"  }}>

                                    <View style={{ alignSelf: 'center', marginTop: 40, marginBottom: 5 }}><Text style={{ fontSize: 30 }}>Change Your Email</Text></View>
                                    <View><Text style={{ fontSize: 20, fontStyle: 'italic', marginTop: 80, marginLeft: 15 }}>Your Current Email: {`${player.email}`}</Text></View>
                                    <Item floatingLabel>
                                        <Label style={{marginLeft: 15}}>Enter New Email</Label>
                                        <Input onChangeText={(text) => this.setState({ email: text })} />
                                    </Item>

                                    <Button onPress={() => this.changeEmail()} block style={{ margin: 15, marginTop: 50 }}>
                                        <Text>SUBMIT</Text>
                                    </Button>

                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setModalOneVisible(!this.state.modalOneVisible);
                                        }}>
                                        <Text style={{ fontSize: 15, alignSelf: 'center', color: '#7B17D3', textDecorationLine: 'underline', marginTop: 10 }}>GO BACK</Text>
                                    </TouchableHighlight>



                                </View>
                            </Modal>


                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalOneVisible(true);
                                }}>
                                <Text style={{ fontSize: 15, marginLeft: 15 }} >Change Email</Text>
                            </TouchableHighlight>


                        </View>

                        {/* Change Password --------------------------------------------------- */}
                        <View style={{flex: 1, marginTop: 22 }}>

                            <Modal
                                animationType="fade"
                                transparent={false}
                                visible={this.state.modalTwoVisible}
                                onRequestClose={() => {
                                    this.setModalTwoVisible(!this.state.modalTwoVisible);
                                }}>


                                <View style={{ marginTop: 22 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>


                                    <View>


                                        <View style={{ alignSelf: 'center', marginTop: 40, marginBottom: 5 }}><Text style={{ fontSize: 30, textDecorationLine: 'underline' }}>Change Password</Text></View>

                                        <Item floatingLabel>
                                            <Label>Enter Old Password</Label>
                                            <Input onChangeText={(text) => this.setState({ password: text })} />
                                        </Item>


                                        <Item floatingLabel>
                                            <Label>Enter New Password</Label>
                                            <Input onChangeText={(text) => this.setState({ newpassword: text })} />
                                        </Item>

                                        <Button onPress={() => this.changePassword()} block style={{ margin: 15, marginTop: 50 }}>
                                            <Text>SUBMIT</Text>
                                        </Button>


                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalTwoVisible(!this.state.modalTwoVisible);
                                            }}>
                                            <Text style={{ fontSize: 15, alignSelf: 'center', color: '#7B17D3', textDecorationLine: 'underline', marginTop: 10 }}>GO BACK</Text>
                                        </TouchableHighlight>


                                    </View>


                                </View>


                            </Modal>
                            <View style={{flex: 1}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalTwoVisible(true);
                                }}>
                                <View> 
                                    <View> 
                                        <Text style={{ fontSize: 15, marginLeft: 15  }} >Change Password</Text>
                                    </View> 
                                </View> 
                            </TouchableOpacity>
                            </View>

                        </View>




                        {/* CONTACT FORM -------------------------------------- */}

                        <View>


                           

                                <Modal
                                    animationType="fade"
                                    transparent={false}
                                    visible={this.state.modalThreeVisible}
                                    onRequestClose={() => {
                                        this.setModalThreeVisible(!this.state.modalThreeVisible);
                                    }}>


                                    <View style={{ marginTop: 22, backgroundColor: "#81BCFF" }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>


                                        <View>


                                            <View style={{ alignSelf: 'center', marginTop: 40, marginBottom: 5 }}><Text style={{ fontSize: 30 }}>Contact Us</Text></View>

                                            <Item floatingLabel style={{marginLeft: 15}}>
                                                <Label>Enter Name</Label>
                                                <Input onChangeText={(text) => this.setState({ name: text })} />
                                            </Item>


                                            <Item floatingLabel style={{marginLeft: 15}}>
                                                <Label>Enter Email</Label>
                                                <Input onChangeText={(text) => this.setState({ email: text })} />
                                            </Item>

                                            <Form>
                                                <Textarea onChangeText={(text) => this.setState({ message: text })} rowSpan={5} bordered placeholder="What's Up?" />
                                            </Form>

                                            <Button onPress={() => this.sendEmail()} block style={{ margin: 15, marginTop: 50 }}>
                                                <Text>SUBMIT</Text>
                                            </Button>


                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.setModalThreeVisible(!this.state.modalThreeVisible);
                                                }}>
                                                <Text style={{ fontSize: 15, alignSelf: 'center', color: '#7B17D3', textDecorationLine: 'underline', marginTop: 10 }}>GO BACK</Text>
                                            </TouchableHighlight>


                                        </View>


                                    </View>


                                </Modal>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalThreeVisible(true);
                                    }}>
                                    <Text style={{ fontSize: 15 }} >Contact Us</Text>
                                </TouchableHighlight>


                            

                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text> Beta Version 1.0.1 </Text>
                            <Text> Developer By: Alan Pramuk, Robert Tate, Justin Head </Text>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#81BCFF"
    }

});