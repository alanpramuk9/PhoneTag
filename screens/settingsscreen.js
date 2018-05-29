import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { StyleSheet, View, Dimensions, Modal, TouchableHighlight } from 'react-native';

import * as userService from '../services/users';


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            modalVisible: false,
        }
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }



    render() {
        // console.log(this.props.navigation.state.params);
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
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <View style={{ marginTop: 22 }}>
                                    <View>
                                        <Text>Hello World!</Text>

                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text>GO BACK</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}>
                                <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#7B17D3' }} >Change Email</Text>
                            </TouchableHighlight>
                        </View>


       <View style={{ marginTop: 22 }}>
                            <Modal
                                animationType="fade"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <View style={{ marginTop: 22 }}>
                                    <View>
                                        <Text>Hello World!</Text>

                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text>GO BACK</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(true);
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