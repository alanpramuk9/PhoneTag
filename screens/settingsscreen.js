import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Label, Input } from 'native-base';
import { StyleSheet, View, Dimensions, Modal, TouchableHighlight } from 'react-native';

import * as userService from '../services/users';


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.navigation.state.params.playerInfo.id,
            name: '',
            email: '',
            password: '',
            newpassword: '',
            modalOneVisible: false,
            modalTwoVisible: false,
        }
    }


    setModalOneVisible(visible) {
        this.setState({ modalOneVisible: visible });
    }

    setModalTwoVisible(visible) {
        this.setState({ modalTwoVisible: visible });
    }


    changeEmail() {
        userService.editEmail(this.state.id, this.state.email)
            .then((result) => {
                this.props.navigation.navigate('Profile', {});
            }).catch((err) => {
                console.log(err);
            });
    };


    render() {
        const player = this.props.navigation.state.params.playerInfo;
        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{ alignSelf: 'center', marginTop: 40, marginBottom: 5 }}><Text style={{ fontSize: 50, textDecorationLine: 'underline' }}>Settings</Text></View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                        <View><Text style={{ fontSize: 35 }}>{`${player.name}`}</Text></View>
                        <View><Text style={{ fontSize: 30, fontStyle: 'italic' }}>{`${player.email}`}</Text></View>


                        <View style={{ marginTop: 22 }}>


                            <Modal
                                animationType="fade"
                                transparent={false}
                                visible={this.state.modalOneVisible}
                                onRequestClose={() => {
                                    this.setModalOneVisible(!this.state.modalOneVisible);
                                }}>
                                <View style={{ marginTop: 22 }}>

                                    <View style={{ alignSelf: 'center', marginTop: 40, marginBottom: 5 }}><Text style={{ fontSize: 30, textDecorationLine: 'underline' }}>Change Email</Text></View>
                                    <View><Text style={{ fontSize: 20, fontStyle: 'italic', marginTop: 80 }}>{`${player.email}`}</Text></View>
                                    <Item floatingLabel>
                                        <Label>Enter New Email</Label>
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
                                <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#7B17D3' }} >Change Email</Text>
                            </TouchableHighlight>


                        </View>


                        <View style={{ marginTop: 22 }}>

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

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalTwoVisible(true);
                                }}>
                                <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#7B17D3' }} >Change Password</Text>
                            </TouchableHighlight>


                        </View>

                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 50, marginBottom: 10, }}><Text style={{ fontSize: 15, textDecorationLine: 'underline', color: '#796789' }}>Contact Us</Text></View>

                </Content>
            </Container>
        )
    }


}