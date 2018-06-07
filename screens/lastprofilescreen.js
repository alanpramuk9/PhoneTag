import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, View, Image, ScrollView, CameraRoll, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1, Segment } from 'native-base';
import * as usersService from '../services/users';
import ProfileScore from '../components/profilescore';
import { getMyPlayerId } from '../services/playergame';
import * as playergameService from '../services/playergame';

import { RNS3 } from 'react-native-aws3';
import ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class LastProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            pickedImage: null,
            photo: 'https://s3.amazonaws.com/alanblogimage/s3/defaultphoto.png',
            id: props.navigation.state.params.lastScore.player_id
        };
    }
    componentDidMount() {


        usersService.whoIsThis(this.state.id)
            .then((player) => {
                this.setState({ player });
                this.setState({ photo: player.picture})
            }).catch((err) => {
                console.log(err);
            });

    
    }
    

    static navigationOptions = {
        title: "User Profile",
        headerStyle: {backgroundColor: '#4054b2' },
        headerTitleStyle: { color: 'white', paddingLeft: 80  },
        
    }

    render() {

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 0 }}>
                    <View>
                        <View style={styles.main}>
                            <View style={{ alignSelf: 'center', marginBottom: 20, marginTop: 15 }}>
                                    <Image source={{uri: `${this.state.photo}`}} style={{ height: 150, width: 175, borderRadius: 50 }} />
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={styles.lessbold}><Text style={styles.lessbold}>@{this.state.player.username}</Text></Text>
                            </View>
                        </View>
                        <View>
                            <ProfileScore value={this.state.player} />
                        </View>



                        {/* start of badges */}

                    </View>

                </Content>
            </Container>
        )

    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    pictureBtn: {

    },
    lessbold: {

        fontSize: 12,
        color: 'white'
    },
    main: {
        backgroundColor: "#3F51B5"
    },
    viewStyleContainer: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    }
});