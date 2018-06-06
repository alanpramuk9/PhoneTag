import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, View, Image, ScrollView, CameraRoll, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1, Segment } from 'native-base';
import * as usersService from '../services/users';
import ProfileScore from '../components/profilescore';
import { getMyPlayerId } from '../services/playergame';
import * as playergameService from '../services/playergame';

import { RNS3 } from 'react-native-aws3';
import ImagePicker from 'react-native-image-picker';



export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            pickedImage: null
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


    // addProfile(image) {
    //     let formData = new FormData();
    //     formData.append("image", image);
    //     fetch('api')
    // }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
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
                    alignItems: 'center'    
                }}>
                    <View style={styles.main}>

                        <View><Image source={require('../images/bird.jpg')} style={{ height: 150, width: 150, borderRadius: 50, flex: 0 }} />

                        </View>
                        <View>
                            <View style={styles.button}>
                                <Button onPress={this.pickImageHandler} >
                                    <Text> Change Profile Pic </Text>
                                </Button>
                            </View>
                        </View>
                        
                        <View>
                            <Text style={styles.bold}>User Name: <Text style={styles.bold} >{this.state.player.name}</Text></Text>
                            <Text style={styles.lessbold}>Name: <Text>@{this.state.player.username}</Text></Text>

                        </View>
                        </View>
                        <View>
                            
                            <ProfileScore value={this.state.player} />
                        </View>

                    

                    {/* start of badges */}
                    <View> 


                    </View> 
                </Content>
            </Container>
        )

    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    lessbold: {
        
        fontSize: 17,
        color: 'white'
    },
    main: {
        backgroundColor: "#81BCFF"
    },
    viewStyleContainer: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    }
});