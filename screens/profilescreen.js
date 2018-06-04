import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, View, Image, ScrollView, CameraRoll, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1, Segment } from 'native-base';
import * as usersService from '../services/users';
import ProfileScore from '../components/profilescore';
import { getMyPlayerId } from '../services/playergame';
import * as playergameService from '../services/playergame';

import ViewPhotos from '../components/ViewPhotos';



export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            photoArray: [],
            showPhotoGallery: false
        };
    }

    componentDidMount() {
        usersService.profile()
            .then((player) => {
                this.setState({ player });
                // console.log(this.state.player);
            }).catch((err) => {
                console.log(err);
            })
    }

    static navigationOptions = {
        header: null
    }


    addProfile(image) {
        let formData = new FormData();
        formData.append("image", image);
        fetch('api')
    }

    //handle camera roll to show pics
    getPhotosFromGallery() {
        CameraRoll.getPhotos({ first: 1000 })
            .then(res => {
                let photoArray = res.edges;
                this.setState({ showPhotoGallery: true, photoArray: photoArray })
            })
    }

    render() {
        let playerInfo = this.state.player;
        if (this.state.showPhotoGallery) {
            return (
                <ViewPhotos
                    photoArray={this.state.photoArray} />
            )
        }
        return (
            <Container>
                <Header>
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
                <Content contentContainerStyle={{
                    flex: 0,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: 50
                }}>

                    <View><Image source={require('../images/bird.jpg')} style={{ height: 100, width: 100, borderRadius: 50, flex: 0 }} />

                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.getPhotosFromGallery()}>
                            <Image
                                source={require('../images/addPhoto.png')} />
                        </TouchableHighlight>
                    </View>


                        
                    <View>
                        <Text style={styles.bold}>User Name: <Text>{this.state.player.username}</Text></Text>
                        <Text style={styles.bold}>Name: <Text>{this.state.player.name}</Text></Text>
                        <Text style={styles.bold}>Email: <Text>{this.state.player.email}</Text></Text>
                    </View>
                    <View>
                        <H1>Score</H1>
                        <ProfileScore value={this.state.player} />
                    </View>

                </Content>
            </Container>
        )

    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: '700',
        fontSize: 24
    },
    profilePhoto: {
        borderRadius: 50
    },
    viewStyleContainer: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    }
});