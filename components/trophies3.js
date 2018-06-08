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



export default class Trophies3 extends Component {
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
             
            <View style={styles.makeFlex}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}> 
                    <Image style={styles.image} source={GoldMedal} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 1,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={GoldTrophy} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 10,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={OnMountain} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 100,000 Points </Text>
               </View>
            </View>
            )
        } else if(this.props.value > 10000) { 
            return (
            <View style={styles.makeFlex}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}> 
                    <Image style={styles.image} source={GoldMedal} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 1,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={GoldTrophy} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 10,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={NotOnMountain} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 100,000 Points </Text>
               </View>
            </View>
            
        )
    } else if(this.props.value > 1000) {
        return (
            
            <View style={styles.makeFlex}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}> 
                    <Image style={styles.image} source={GoldMedal} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 1,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={BlackTrophy} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 10,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={NotOnMountain} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 100,000 Points </Text>
               </View>
            </View>
        )
    } else {
        return(
            <View style={styles.makeFlex}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}> 
                    <Image style={styles.image} source={BlackMedal} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 1,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={BlackTrophy} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 10,000 Points </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <Image style={styles.image} source={NotOnMountain} />
                    <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}> 100,000 Points </Text>
               </View>
            </View>
        )
    }

    }



}



const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 80,
        alignSelf: 'center'
    },
    makeFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    }

});