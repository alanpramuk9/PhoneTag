import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as playergameService from '../services/playergame';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    H1,
    Segment,
} from 'native-base';

export default class ProfileScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seg: 1,
            playergame: '',
            lastgame: '',
            currentGameId: '',
            lastGameId: '',
            total: '' };
    }
        componentWillReceiveProps(newProps) {
            let id = newProps.value.id;
            // console.log(newProps.value.id);
    
            playergameService.getMyPlayergame(id)
            .then((player) => {
                console.log(player);
                // console.log(player.length -1);
                let playergame = player[player.length -1].total_points;
                let currentGameId = player[player.length -1].game_id;
                let lastgame = player[player.length -2].total_points;
                let lastGameId = player[player.length -2].game_id;
                this.setState({ playergame, lastgame, currentGameId, lastGameId });
                console.log(this.state.playergame);
                console.log(this.state.lastgame);
                console.log(currentGameId);
                console.log(lastGameId);
            }).catch((err) => {
                console.log(err);
            })

            playergameService.getMyAllTimeScore(id)
            .then((score) => {
                console.log(score[0].Total_Score);
                let total = score[0].Total_Score;
                this.setState({ total })
            }).catch((err) => {

            })

            playergameService.getAllScores()
            .then((scores) => {
                console.log(scores);
            }).catch((err) => {
                console.log(err);
            })
        }
    
    render() {
        if (this.state.seg === 1) {
            return (

                <Container>
                        <Segment>
                            <Button
                                first
                                active={this.state.seg === 1 ? true : false}
                                onPress={() => this.setState({ seg: 1 })}>
                                <Text>Current </Text>
                            </Button>
                            <Button
                                active={this.state.seg === 2 ? true : false}
                                onPress={() => this.setState({ seg: 2 })}>
                                <Text>Last </Text>
                            </Button>
                            <Button
                                last
                                active={this.state.seg === 3 ? true : false}
                                onPress={() => this.setState({ seg: 3 })}>
                                <Text>AllTime</Text>
                            </Button>
                        </Segment>
                        <Content
                        contentContainerStyle={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>
                        <View>
                        <Text>Your Current Score: {this.state.playergame}</Text>
                        </View>
                    </Content>
                </Container>
            );
        } else if (this.state.seg === 2) {
            return (
                <Container>

                        <Segment>
                            <Button
                                first
                                active={this.state.seg === 1 ? true : false}
                                onPress={() => this.setState({ seg: 1 })}>
                                <Text>Current </Text>
                            </Button>
                            <Button
                                active={this.state.seg === 2 ? true : false}
                                onPress={() => this.setState({ seg: 2 })}>
                                <Text>Last </Text>
                            </Button>
                            <Button
                                last
                                active={this.state.seg === 3 ? true : false}
                                onPress={() => this.setState({ seg: 3 })}>
                                <Text>AllTime</Text>
                            </Button>
                        </Segment>
                        <Content
                        contentContainerStyle={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>
                        <View>
                        <Text>Your Last Games Score: {this.state.lastgame}</Text>
                        </View>
                    </Content>
                </Container>
            );
        } else {
            return (
                <Container>

                        <Segment>
                            <Button
                                first
                                active={this.state.seg === 1 ? true : false}
                                onPress={() => this.setState({ seg: 1 })}>
                                <Text>Current </Text>
                            </Button>
                            <Button
                                active={this.state.seg === 2 ? true : false}
                                onPress={() => this.setState({ seg: 2 })}>
                                <Text>Last </Text>
                            </Button>
                            <Button
                                last
                                active={this.state.seg === 3 ? true : false}
                                onPress={() => this.setState({ seg: 3 })}>
                                <Text>AllTime </Text>
                            </Button>
                        </Segment>
                        <Content
                        contentContainerStyle={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>
                        <View>
                        <Text>Your AllTime Score: {this.state.total}</Text>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}
