import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import * as gameService from '../services/game';
import * as playergameService from '../services/playergame';
import CurrentProfileScreen from './currentprofilescreen';
import CombinedProfileScreen from './combinedprofilescreen';
import LastProfileScreen from './lastprofilescreen';

import { StyleSheet, View, Image, Text } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Thumbnail,
    Segment,
    Left,
    Right,
    Body,
} from 'native-base';


class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seg: 1,
            currentScores: [],
            lastScores: [],
            combinedScores: []

        };
    }
    componentDidMount() {

      playergameService.getAllTimeScores() 
        .then((alltimeScores) => {
          this.setState({ combinedScores: alltimeScores });
        }).catch((err) => {
          console.log(err);
        })

      gameService.findGames()
      .then((games) => {
        let currentGameId = games[games.length -1 ].id;
        let lastGameId = games[games.length -2 ].id;

        this.getCurrentPlayersScores(currentGameId);
        this.getPlayersScores(lastGameId);

      }).catch((err) => {
        console.log(err);
      })

    }

    getPlayersScores(gameId) {
      playergameService.getAllScores(gameId)
          .then((scores) => {
            this.setState({ 'lastScores': scores })
          }).catch((err) => {
            console.log(err)})
    }
    getCurrentPlayersScores(gameId) {
      playergameService.getAllScores(gameId)
          .then((scores) => {
            this.setState({ 'currentScores': scores })
          }).catch((err) => {
            console.log(err)})
    }

    static navigationOptions = {
        header: null
    }

    render() {
        if (this.state.seg === 1) {
            return (
                <Container style={styles.container}>
                    <Header>
                        <Body>
                            <Title style={{ paddingLeft: 150 }}>
                                Leaderboard
                            </Title>
                        </Body>
                    </Header>
                    <Segment>
                        <Button
                            first
                            active={this.state.seg === 1 ? true : false}
                            onPress={() => this.setState({ seg: 1 })}>
                            <Text>Current Game</Text>
                        </Button>
                        <Button
                            active={this.state.seg === 2 ? true : false}
                            onPress={() => this.setState({ seg: 2 })}>
                            <Text>Last Game</Text>
                        </Button>
                        <Button
                            last
                            active={this.state.seg === 3 ? true : false}
                            onPress={() => this.setState({ seg: 3 })}>
                            <Text>AllTime Score</Text>
                        </Button>
                    </Segment>

                    <Content>

                        <List>
                            {this.state.currentScores.map((currentScore, i) => (
                                <ListItem key={currentScore.player_id} style={styles.leaderlist}>
                                    <Left>
                                        <Text style={styles.number}>
                                            {i + 1}
                                        </Text>
                                        {/* <Thumbnail small source={data.img} /> */}
                                    </Left>
                                    <Body>
                                        <Button style={{backgroundColor: 'transparent'}} onPress={() => this.props.navigation.navigate('CurrentProfile', { currentScore })}>
                                            <Text>{currentScore.username}</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Text note>{currentScore.total_points}</Text>
                                    </Right>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                </Container>
            );
        } else if (this.state.seg === 2) {
            return (
                <Container style={styles.container}>
                    <Header>
                        <Body>
                            <Title style={{ paddingLeft: 150 }}>
                                Leaderboard
                            </Title>
                        </Body>
                    </Header>
                    <Segment>
                        <Button
                            first
                            active={this.state.seg === 1 ? true : false}
                            onPress={() => this.setState({ seg: 1 })}>
                            <Text>Current Game</Text>
                        </Button>
                        <Button
                            active={this.state.seg === 2 ? true : false}
                            onPress={() => this.setState({ seg: 2 })}>
                            <Text>Last Game</Text>
                        </Button>
                        <Button
                            last
                            active={this.state.seg === 3 ? true : false}
                            onPress={() => this.setState({ seg: 3 })}>
                            <Text>AllTime Score</Text>
                        </Button>
                    </Segment>

                    <Content>
                        <List>
                            {this.state.lastScores.map((lastScore, i) => (
                                <ListItem key={lastScore.player_id} style={styles.leaderlist}>
                                    <Left>
                                        <Text style={styles.number}>
                                            {i + 1}
                                        </Text>
                                        {/* <Thumbnail small source={data.img} /> */}
                                    </Left>
                                    <Body>
                                    <Button style={{backgroundColor: 'transparent'}} onPress={() => this.props.navigation.navigate('LastProfile', { lastScore })}>
                                            <Text>{lastScore.username}</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Text note>{lastScore.total_points}</Text>
                                    </Right>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                </Container>
            );
        } else {
            return (
                <Container style={styles.container}>
                    <Header>
                        <Body>
                            <Title style={{ paddingLeft: 150 }}>
                                Leaderboard
                            </Title>
                        </Body>
                    </Header>
                    <Segment>
                        <Button
                            first
                            active={this.state.seg === 1 ? true : false}
                            onPress={() => this.setState({ seg: 1 })}>
                            <Text>Current Game</Text>
                        </Button>
                        <Button
                            active={this.state.seg === 2 ? true : false}
                            onPress={() => this.setState({ seg: 2 })}>
                            <Text>Last Game</Text>
                        </Button>
                        <Button
                            last
                            active={this.state.seg === 3 ? true : false}
                            onPress={() => this.setState({ seg: 3 })}>
                            <Text>AllTime Score</Text>
                        </Button>
                    </Segment>

                    <Content>
                        <List>
                            {this.state.combinedScores.map((combinedScore, i) => (
                                <ListItem key={combinedScore.player_id} style={styles.leaderlist}>
                                    <Left>
                                        <Text style={styles.number}>
                                            {i + 1}
                                        </Text>
                                        {/* <Thumbnail small source={data.img} /> */}
                                    </Left>
                                    <Body>
                                        <Button style={{backgroundColor: 'transparent'}} onPress={() => this.props.navigation.navigate('CombinedProfile', { combinedScore })}>
                                            <Text>{combinedScore.username}</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Text note>{combinedScore.Total_Score}</Text>
                                    </Right>
                                </ListItem>
                            ))}
                        </List>
                    </Content>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },
    number: {
        marginRight: 10,
        alignSelf: 'center',
    },
    leaderlist: {
        justifyContent: 'space-evenly',
    },
});

export default Leaderboard;
