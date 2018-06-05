import React, { Component } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Dimensions, Image, StatusBar, Animated, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Icon } from 'native-base';

import JellyBeanBlue from '../images/jellybeanbluesmall.png';
import JellyBeanGreen from '../images/jellybeangreensmall.png'

import * as pinsService from '../services/pins';
import * as playerGameService from '../services/playergame';
import * as userService from '../services/users';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0421;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const initialRegion = {
//     latitude: 36.14319077106534,
//     longitude: -86.76708101838142,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }

class MapScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 36.14319077106534,
                longitude: -86.76708101838142,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            pins: [],
            gameId: null,
            playerId: null,
            id: null,
            playerGameId: null,

            //oldMarker: [],
            // markers: [{
            //     id: 99,
            //     coordinate: {
            //         latitude: 36.142922002619805,
            //         longitude: -86.7670841419839
            //     },
            // },
            //
            // ],
        }
    }

    // setRegion(region) {
    //     if(this.state.ready) {
    //       setTimeout(() => this.map.animateToRegion(region), 10);
    //     }
    //     //this.setState({ region });
    //   }

    componentDidMount() {

        this.allThePins();

        navigator.geolocation.getCurrentPosition((position) => {

            let lat = parseFloat(position.coords.latitude);
            let long = parseFloat(position.coords.longitude);
            console.log('Current position lat: ' + lat);
            console.log('Current position long: ' + long);

            this.setState({
                region: {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            });

        },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000, distanceFilter: 1 })

        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let lat = parseFloat(position.coords.latitude)
            let long = parseFloat(position.coords.longitude)

            let lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            this.setState({ region: lastRegion });
            //this.setState({markerPosition: lastRegion});
            //this.onRegionChangeComplete(region, region.latitude, region.longitude);
            //this.map.animateToRegion(region, 100);
        })


        userService.me()
            .then((result) => {
                this.myPlayerGame(result.id)
                // console.log('GETTING ID RESULT')
                // console.log(result);
            }).catch((err) => {
                console.log(err);
            })


    }


    allThePins() {
        pinsService.getAllPins()
            .then((result) => {
                this.setState({ pins: result });
                // console.log(this.state.pins);
            }).catch((err) => {
                console.log(err);
            });
    }

    myPlayerGame(id) {
        playerGameService.getMyPlayergame(id)
            .then((result) => {
                let currentResult = result[result.length - 1]
                console.log('HERE IS THE CURRENT RESULT  ------------------------------------------------------------')
                console.log(currentResult);
                
                this.setState({ playerGameId: currentResult.id})
                this.setState({ playerId: currentResult.player_id })
                this.setState({ gameId: currentResult.game_id })
                this.setState({ id: currentResult.player_id })
                // console.log('GETTING RESULTS FROM PLAYERGAME TABLE')
                // console.log(currentResult.player_id);
                // console.log(currentResult.game_id)


            }).catch((err) => {
                console.log(err);
            });
    }


    savePin() {
        pinsService.setPins(this.state.region.latitude, this.state.region.longitude, this.state.gameId, this.state.playerGameId)
            .then((result) => {
                console.log('A PIN IS BEING SET')
                allThePins();

            }).catch((err) => {
                console.log(err);
            });
    }


    pickUpPin(playerID, pinID, lat, long) {
        pinsService.getOnePin(pinID)
            .then((result) => {
                if (result.playergame_ok_id === this.state.playerGameId) {
                    console.log('YOU OWN THIS PIN -----------------------------------------------------------------')
                    Alert.alert(
                        "You can't pick up your own pin!",
                        "Nice try though.",
                        [
                            {
                                text: "GO BACK", onPress: () => {
                                    console.log("Alert dismissed for trying to pick up own pin");
                                }
                            },
                        ],
                        { cancelable: false }
                    )
                } else {
                    console.log('YOU DONT OWN THIS PIN -----------------------------------------------------------------')
                    pinsService.pickUpPin(ID, lat, long)
                        .then((result) => {
                            console.log('A PIN HAS BEEN PICKED UP ------------------------------------------------------------');
                            allThePins();
                        }).catch((err) => {
                            console.log(err);
                        });
                }
            }).catch((err) => {
                console.log(err);
            });
    }


    //updates latLong of current position
    // onRegionChangeComplete(region, lastLat, lastLong) {
    //     this.setState({
    //         initialPosition: region,
    //         lastLat: lastLat || this.state.lastLat,
    //         lastLong: lastLong || this.state.lastLong
    //     });
    // }
    onRegionChangeComplete = (region) => {
        console.log('onRegionChangeComplete', region);
    };



    onPressAnimate = () => {
        Animated.sequence([
            Animated.spring(this.state._legalLabelPositionY, {
                toValue: 100,
            }),
            Animated.spring(this.state._legalLabelPositionY, {
                toValue: 10,
            }),
        ]).start();
    }

    //set marker on pressing map
    onMapPress(e) {
        console.log('value of e when pressing map.' + e)
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    // key: id++,
                },
            ],
        });
    }

    onPressZoomIn() {
        this.region = {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: this.state.region.latitudeDelta * 10,
            longitudeDelta: this.state.region.longitudeDelta * 10
        }

        this.setState({
            region: {
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
                latitude: this.region.latitude,
                longitude: this.region.longitude
            }
        })


    }

    onPressZoomOut() {
        this.region = {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: this.state.region.latitudeDelta / 10,
            longitudeDelta: this.state.region.longitudeDelta / 10
        }
        this.setState({
            region: {
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
                latitude: this.region.latitude,
                longitude: this.region.longitude
            }
        })
        //this.map.animateToRegion(this.region, 100);
        //console.log('lt : ' + region.ltDelta + ' lg : ' + region.lgDelta)
    }

    // onPressAddMarker = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {

    //         let lat = parseFloat(position.coords.latitude);
    //         let long = parseFloat(position.coords.longitude);
    //         console.log('Button pressed position lat2: ' + lat);
    //         console.log('Button pressed current position long2: ' + long);
    //         console.log('state of markers ' + this.state.markers);


    //         this.setState(prevState => {
    //             return {
    //                 markers: {
    //                     ...prevState.markers,
    //                     latitude: lat,
    //                     longitude: long
    //                 },
    //                 //ocationChosen: true
    //             };
    //         })
    //         console.log('previously only 5 markers set ' + this.state.markers.coordinate)
    //     })
    // }

    // let latLong = [lat, long];
    // console.log('lanlong array' + latLong);
    // this.state.oldMarker.concat(latLong);
    // console.log('oldmarker array' + this.state.oldMarker);
    // this.setState({
    //   markers: [...this.state.markers, ...this.state.oldMarker]
    //   })
    //   console.log('new marker added to state? 5 things now in markers ' + this.state.markers)
    // })



    // this.setState({
    //   ...markers: {
    //     latitude: lat,
    //     longitude: long
    //   }
    //   });


    // pickLocationHandler = event => {
    //   const coords = event.nativeEvent.coordinate;
    //   //smooth animation function
    //   // this.map.animateToRegion({
    //   //   ...this.state.focusedLocation,
    //   //   latitude: coords.latitude,
    //   //   longitude: coords.longitude
    //   // });
    //   this.setState(prevState => {
    //     return {
    //       focusedLocation: {
    //         ...prevState.focusedLocation,
    //         latitude: coords.latitude,
    //         longitude: coords.longitude
    //       },
    //       //ocationChosen: true
    //     };
    //   });
    // };

    //locates the user
    // getLocationHandler = () => {
    //   navigator.geolocation.getCurrentPosition(pos => {
    //     const coordsEvent = {
    //       nativeEvent: {
    //         coordinate: {
    //           latitude: pos.coords.latitude,
    //           longitude: pos.coords.longitude
    //         }
    //       }
    //     };
    //     this.pickLocationHandler(coordsEvent);
    //   },
    // err => {
    //   console.log(err);
    //   alert("Fetching the Position failed, please pick one manually!");
    // })
    // }


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {

        //console.log('region is ' + this.state.focusedLocation)

        return (
            <View style={styles.container}>
                <MapView
                    //initialRegion={this.state.initialRegion}
                    //provider={"google"}
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}
                    style={styles.map}
                    // onPress={(e) => this.onMapPress(e)}
                    mapType={"standard"}
                    //onPress={this.onMapPress(e)}
                    showsScale={true}
                    showsCompass={true}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    zoomEnabled={true}
                    //onRegionChange={this.onRegionChange.bind(this)}
                    //onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    customMapStyle={mapStyle}
                    loadingEnabled={true}
                    loadingIndicatorColor={'#606060'}
                    loadingBackgroundColor={'#FFFFFF'}
                    //onMarkerSelect= callback for when a marker on map becomes selected

                    //store a reference to the MapView object so that we can call method animate 
                    //to region in the pickLocationHandler
                    ref={map => this.map = map}
                //textStyle={{ color: '#bc8b00' }}
                //containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}

                >

                    {this.state.pins.map((pin, index) => {

                        let latLong = { latitude: this.state.pins[index].latitude, longitude: this.state.pins[index].longitude }
                        let pincolor;
                        
                        if (this.state.pins[index].playergame_ok_id === this.state.playerGameId) {
                            console.log('color should be blue');
                            pincolor = JellyBeanBlue
                        } else {
                            console.log('color should be green');
                            pincolor = JellyBeanGreen
                        }


                        return (

                            <MapView.Marker
                                
                                image={pincolor}
                                style={styles.jellybean}
                                onPress={(e) => {
                                    console.log('PIN HAS BEEN PRESSED')
                                    
                                    this.pickUpPin(this.state.playerId, this.state.pins[index].id, e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                                }}
                                key={index}
                                coordinate={latLong}
                            >
                                {/* <Image source={pincolor} style={{width: 70, height: 70}} /> */}
                            </MapView.Marker>
                        )
                    })}
                </MapView>



                <View style={styles.zoom}>
                    <TouchableOpacity
                        style={styles.zoomIn}
                        onPress={() => { () => this.onPressZoomIn() }}
                    >
                        <Icon
                            name="add"
                            style={styles.icon}
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.zoomOut}
                        onPress={() => { () => this.onPressZoomOut() }}
                    >
                        <Icon
                            name="remove"
                            style={styles.icon}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.username}>
                    <TouchableOpacity onPress={this.onPressAnimate}>
                        <Text style={styles.usernameText}>Username</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <Button title="Add Marker" onPress={() => this.savePin()}>

                    </Button>
                </View>
                <View style={styles.bio}>
                    <Text style={styles.bioText}>
                        lorem ipsum Ullamco exercitation
                        aliqua ullamco nostrud dolor et aliquip
                </Text>
                </View>

                <View style={styles.photo}>
                    <View style={styles.photoInner}>
                        <Text style={styles.photoText}>
                            Profile Photo
                    </Text>
                    </View>
                </View>

            </View>
        );
    }
}

// *******************************************
// *****        Custom StyleSheet   **********
// *******************************************

//custom map configurations if we want to change how default map looks like. 
mapStyle = [

]
const padding = 10;
const photoSize = 80;
const mapHeight = SCREEN_HEIGHT - 130;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    button: {
        margin: 8
    },
    zoom: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'

    },
    icon: {
        color: 'white',
        fontSize: 50,
        marginRight: 25,
        marginBottom: 15
    },
    bio: {
        marginHorizontal: padding,
        marginBottom: 0,
        paddingVertical: padding / 2,
        backgroundColor: 'white'
    },
    bioText: {
        fontSize: 16,
        lineHeight: 16 * 1.5,
        backgroundColor: 'white'
    },
    username: {
        paddingLeft: photoSize + padding + padding,
        paddingTop: padding,
        backgroundColor: 'white'
    },
    usernameText: {
        fontSize: 24,
        lineHeight: 36,
        color: 'blue',
        textDecorationLine: 'underline',
        backgroundColor: 'white'
    },
    photo: {
        padding: 2,
        position: 'absolute',
        top: mapHeight - (photoSize / 2),
        left: padding,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc',
        width: photoSize,
        height: photoSize,
        backgroundColor: 'grey'
    },
    photoInner: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    photoText: {
        fontSize: 9,
        textAlign: 'center',
    },

    buttonMarker: {
        backgroundColor: 'yellow',
        width: 30,
        paddingLeft: 20,
    },
    jellybean: {
        width: 10,
        height: 10,
    }
});

export default MapScreen;
