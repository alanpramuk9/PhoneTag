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

import BlackMedal from '../images/LeastPointsBW.png';
import GoldMedal from '../images/LeastPointsC.png'
import BlackTrophy from '../images/trophyblack.png';
import GoldTrophy from '../images/trophygold.png';
import NotOnMountain from '../images/MaxPointsBW.png';
import OnMountain from '../images/MaxPointsC.png';



export default class Trophies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playergame: '',
            lastgame: '',
            currentGameId: '',
            lastGameId: '',
            total: '',
            currentRank: '',
            lastRank: '',
            allTimeRank: ''
        };
    }

    componentWillReceiveProps(newProps) {
        let id = newProps.value.id;

    }


    render() {
        console.log(this.props.value)
        if (this.props.value > 100000) {
            return (
                <View>
                <View>
                    <Image style={styles.image} source={GoldMedal} />
                </View>
                <View>
                    <Image style={styles.image} source={GoldTrophy} />
                </View>
                <View>
                    <Image style={styles.image} source={OnMountain} />
                </View>
            </View>
            )
        } else if(this.props.value > 10000) { 
            return (
                <View>
                <View>
                    <Image style={styles.image} source={GoldMedal} />
                </View>
                <View>
                    <Image style={styles.image} source={GoldTrophy} />
                </View>
                <View>
                    <Image style={styles.image} source={NotOnMountain} />
                </View>
            </View>
        )
    } else if(this.props.value > 1000) {
        return (
            <View>
                <View>
                    <Image style={styles.image} source={GoldMedal} />
                </View>
                <View>
                    <Image style={styles.image} source={BlackTrophy} />
                </View>
                <View>
                    <Image style={styles.image} source={NotOnMountain} />
                </View>
            </View>
        )
    } else {
        return(
            <View style={styles.makeFlex}>
                {/* <View> */}
                    <Image style={styles.image} source={BlackMedal} />
                {/* </View>
                <View> */}
                    <Image style={styles.image} source={BlackTrophy} />
                {/* </View>
                <View> */}
                    <Image style={styles.image} source={NotOnMountain} />
                {/* </View> */}
            </View>
        )
    }

    }



}



const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100
    },
    makeFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    }

});