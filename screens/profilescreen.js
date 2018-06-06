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


export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            pickedImage: null,
            photo: 'https://s3.amazonaws.com/alanblogimage/s3/defaultphoto.png'
        };
    }

    componentDidMount() {
        usersService.profile()
            .then((player) => {
                this.setState({ player });
                this.setState({ photo: player.picture})
            }).catch((err) => {
                console.log(err);
            });

        // usersService.getPhoto(this.state.player.id)
        // .then((result) => {
        //     console.log(result);
        //     this.setState({ photo: result.picture})
        // }).catch((err) => {
        //     console.log(err);
        // });

    }

    static navigationOptions = {
        header: null
    }


    // addProfile(image) {
    //     let formData = new FormData();
    //     formData.append("image", image);
    //     fetch('api')
    // }

    pickImageHandler() {
        ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                console.log(file);
                const file = {
                    uri: res.uri,
                    name: res.fileName,
                    type: 'image/jpeg'
                }
                const config = {
                    keyPrefix: "s3/",
                    bucket: "alanblogimage",
                    region: "us-east-1",
                    accessKey: "AKIAINN3DOEWB3CYD7XA",
                    secretKey: "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",
                    successActionStatus: 201
                }
                RNS3.put(file, config)
                    .then((response) => {
                        console.log('Response  ')
                        console.log(response);
                        console.log(response.body.postResponse.location);
                        this.setState({ photo: response.body.postResponse.location })
                        usersService.editPhoto(this.state.player.id, response.body.postResponse.location)
                    })
                this.setState({
                    pickedImage: { uri: res.uri, base64: res.data }

                });

            }
        });
    }

    render() {
        let playerInfo = this.state.player;

        return (
            <Container>
                <Header style={{ borderBottomWidth: 0, shadowOffset: { height: 0, width: 0 }, shadowOpacity: 0, elevation: 0 }}>
                    <Left>
                        <Button onPress={() => this.props.navigation.navigate('Settings', { playerInfo })}>
                            <Icon name="ios-settings-outline" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ paddingLeft: 100 }}>Profile</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.navigation.navigate('SignedOut')}>
                            <Text>Log Out</Text>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View>
                        <View style={styles.main}>
                            <View style={{ alignSelf: 'center', marginBottom: 20, marginTop: 15 }}>
                                <TouchableOpacity
                                    style={styles.pictureBtn}
                                    onPress={() => this.pickImageHandler()}
                                >
                                    <Image source={{uri: `${this.state.photo}`}} style={{ height: 150, width: 175, borderRadius: 50 }} />
                                    <View style={{ position: 'absolute', top: 120, left: 0, right: 0 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: 150, marginLeft: 15, opacity: 0.9, borderRadius: 50 }}>
                                            <FontAwesome
                                                name="edit"
                                                style={{ color: '#81BCFF' }}
                                                size={20}
                                            />
                                            <Text style={{ color: '#81BCFF', fontWeight: 'bold' }}>Edit Picture</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={styles.bold}>Name: <Text style={styles.bold} >{this.state.player.name}</Text></Text>
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