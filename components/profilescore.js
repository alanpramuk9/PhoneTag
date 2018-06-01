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
            total: '',
            currentRank: '',
            lastRank: '',
            allTimeRank: '' };
    }
        componentWillReceiveProps(newProps) {
            let id = newProps.value.id;
    
            playergameService.getMyPlayergame(id)
            .then((player) => {
                let playergame = player[player.length -1].total_points;
                let currentGameId = player[player.length -1].game_id;
                let lastgame = player[player.length -2].total_points;
                let lastGameId = player[player.length -2].game_id;
                this.setState({ playergame, lastgame, currentGameId, lastGameId });
                this.getMyCurrentRank(currentGameId, id);
                this.getMyLastRank(lastGameId, id);
            }).catch((err) => {
                console.log(err);
            })

            playergameService.getAllTimeRankings()
            .then((rank) => {
                let total = rank[0].Total_Score;
                this.setState({ total })
                    let rankLength = rank.length;
                    for ( let i = 0; i < rankLength; i++) {
                        if ( id === rank[i].player_id) {
                            let allTimeRank = i + 1;
                            this.setState({ allTimeRank });
                        }
                    }
            }).catch((err) => {
                console.log(err);
            })
        }
        
        getMyCurrentRank(gameId, playerId) {
            playergameService.profileRankings(gameId, playerId)
            .then((rank) => {
                let rankLength = rank.length;
                for ( let i = 0; i < rankLength; i++) {
                  if ( playerId === rank[i].player_id) {
                      let currentRank = i + 1;
                      this.setState({ currentRank })
                  } 
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        getMyLastRank(gameId, playerId) {
            playergameService.profileRankings(gameId, playerId)
            .then((rank) => {
                let rankLength = rank.length;
                for ( let i = 0; i < rankLength; i++) {
                  if ( playerId === rank[i].player_id) {
                      let lastRank = i + 1;
                      this.setState({ lastRank })
                  } 
                }
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
                        <Text>Your Current Rank: {this.state.currentRank}</Text>
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
                        <Text>Your Last Games Rank: {this.state.lastRank}</Text>
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
                        <Text>Your AllTime Rank: {this.state.allTimeRank}</Text>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}
