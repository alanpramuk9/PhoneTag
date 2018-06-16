import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as playergameService from '../services/playergame';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    View,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Segment,
} from 'native-base';

import Trophies from './trophies';





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
            aTotal: '',
            bTotal: '',
            currentRank: '',
            lastRank: '',
            allTimeRank: ''
        };
    }
    componentWillReceiveProps(newProps) {
        let id = newProps.value.id;

        playergameService.getMyPlayergame(id)
            .then((player) => {
                let playergame = player[player.length - 1].total_points;
                this.setState({ playergame });
                let currentGameId = player[player.length - 1].game_id;
                console.log(currentGameId);
                console.log(id);
                this.getMyCurrentRank(currentGameId, id);
                let lastgame = player[player.length - 2].total_points;
                this.setState({ lastgame });
                let lastGameId = player[player.length - 2].game_id;
                this.getMyLastRank(lastGameId, id);
            }).catch((err) => {
                console.log(err);
            })

        playergameService.getAllTimeRankings()
            .then((rank) => {
                let rankLength = rank.length;
                for (let i = 0; i < rankLength; i++) {
                    if (id === rank[i].player_id) {
                        let allTimeRank = i + 1;
                        this.setState({ allTimeRank });
                    }
                }
            }).catch((err) => {
                console.log(err);
            })

        playergameService.getMyAllTimeScore(id)
            .then((total) => {
                let aTotal = total[0].Total_Score;
                this.setState({ aTotal });
                let bTotal = total[0].Total_Score;
                this.setState({ bTotal })
                this.setState({ total });
            }).catch((err) => {
                console.log(err);
            })


    }


    getMyCurrentRank(gameId, playerId) {
        playergameService.profileRankings(gameId, playerId)
            .then((rank) => {
                console.log(rank);
                let rankLength = rank.length;
                for (let i = 0; i < rankLength; i++) {
                    if (playerId === rank[i].player_id) {
                        let currentRank = i + 1;
                        console.log(`this is ${currentRank}`);
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
                for (let i = 0; i < rankLength; i++) {
                    if (playerId === rank[i].player_id) {
                        let lastRank = i + 1;
                        this.setState({ lastRank })
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        console.log(this.state.currentRank)
        if (this.state.seg === 1) {
            return (

                <Container>
                    <Segment>
                        <Button
                            first
                            active={this.state.seg === 1 ? true : false}
                            onPress={() => this.setState({ seg: 1 })}>
                            <Text>Current Game </Text>
                        </Button>
                        <Button
                            active={this.state.seg === 2 ? true : false}
                            onPress={() => this.setState({ seg: 2 })}>
                            <Text>Last Game </Text>
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
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>
                       <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                            <View style={styles.boxShadow}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 30, paddingTop: 10 }} >Score: </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.playergame}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 30, paddingTop: 10 }}> Rank: </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.currentRank}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>*Trophies for All Time Score*</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Trophies value={this.state.bTotal} />
                            </View>
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
                            <Text>Current Game </Text>
                        </Button>
                        <Button
                            active={this.state.seg === 2 ? true : false}
                            onPress={() => this.setState({ seg: 2 })}>
                            <Text>Last Game </Text>
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
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>
                         <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                            <View style={styles.boxShadow}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 30, paddingTop: 10 }} >Score: </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.lastgame}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 30, paddingTop: 10 }}> Rank: </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.lastRank}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>*Trophies for All Time Score*</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                             <Trophies value={this.state.aTotal} />
                            </View>
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
                            <Text>Current Game </Text>
                        </Button>
                        <Button
                            active={this.state.seg === 2 ? true : false}
                            onPress={() => this.setState({ seg: 2 })}>
                            <Text>Last Game </Text>
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
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>

                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                            <View style={styles.boxShadow}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 30, paddingTop: 10 }} >Score: </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.total[0].Total_Score}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 30, paddingTop: 10 }}> Rank: </Text>
                                    <Text style={{ fontSize: 20 }}>{this.state.allTimeRank}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>*Trophies for All Time Score*</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Trophies value={this.state.total[0].Total_Score} />
                            </View>
                        </View> 
                    </Content>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#81BCFF"
    },
    boxShadow: {
        flex: 1,
        flexDirection: 'row',
        elevation: 2,
    }
});
