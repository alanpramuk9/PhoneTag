import React, { Component } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Dimensions, Image, StatusBar, Animated } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Icon } from 'native-base';

const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const initialRegion = {
    latitude: 36.14319077106534,
    longitude: -86.76708101838142,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

class Mapscreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        initialPosition: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        },
        markers: [{
            id: 99,
            coordinate: {
                latitude: 36.142922002619805,
                longitude: -86.7670841419839
                },
            },
            {
            id: 98,
            coordinate: {
                latitude: 36.14295050095192,
                longitude: -86.7675496962903
                },
            },
            {
            id: 100,
            coordinate: {
                latitude: 36.142560615074984,
                longitude: -86.76765430252374
                },
            },
            {
            id: 101,
            coordinate: {
                latitude: 36.14239433636711,
                longitude: -86.76614760948053
            },
            }
        ],
        //to check previous location to current positiion
        lastLat: null,
        lastLong: null,
        //myPosition: null
        //locationChosen: false
    };

}

setRegion(region) {
    if(this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);
        let initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({initialPosition: initialRegion});
        this.setState({markerPosition: initialRegion});
        
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
        
        this.setState({initialPosition: lastRegion});
        //this.setState({markerPosition: lastRegion});
        //this.onRegionChangeComplete(region, region.latitude, region.longitude);
        //this.map.animateToRegion(region, 100);
        })  
    }

//updates latLong of current position
// onRegionChangeComplete(region, lastLat, lastLong) {
//     this.setState({
//         initialPosition: region,
//         lastLat: lastLat || this.state.lastLat,
//         lastLong: lastLong || this.state.lastLong
//     });
// }
// onRegionChangeComplete = (region) => {
//     console.log('onRegionChangeComplete', region);
//   };

// componentWillMount() {
//     //setTimeout(() => this.setState({ statusBarHeight: screenHeight - 74 }), 500);
// }

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
}
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
    console.log(e)
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
        },
      ],
    });
  }

onPressZoomIn() {
    this.region = {
        latitude: this.state.initialPosition.latitude,
        longitude: this.state.initialPosition.longitude,
        latitudeDelta: this.state.initialPosition.latitudeDelta * 10,
        longitudeDelta: this.state.initialPosition.longitudeDelta * 10
    }

    this.setState({
        initialPosition: {
            latitudeDelta: this.region.latitudeDelta,
            longitudeDelta: this.region.longitudeDelta,
            latitude: this.region.latitude,
            longitude: this.region.longitude
        }
    })
    //this.map.animateToRegion(this.region, 100);

}

onPressZoomOut() {
    this.region = {
        latitude: this.state.initialPosition.latitude,
        longitude: this.state.initialPosition.longitude,
        latitudeDelta: this.state.initialPosition.latitudeDelta / 10,
        longitudeDelta: this.state.initialPosition.longitudeDelta / 10
    }
    this.setState({
        initialPosition: {
            latitudeDelta: this.region.latitudeDelta,
            longitudeDelta: this.region.longitudeDelta,
            latitude: this.region.latitude,
            longitude: this.region.longitude
        }
    })
    //this.map.animateToRegion(this.region, 100);
    //console.log('lt : ' + region.ltDelta + ' lg : ' + region.lgDelta)
}
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

render() {
   
    //console.log('region is ' + this.state.focusedLocation)

    return (
        <View style={styles.container}>
            <MapView
                //initialRegion={this.state.initialRegion}
                region={this.state.initialPosition}
                style={styles.map}
                onPress={(e) => this.onMapPress(e)}
                mapType={"hybrid"}
                //onPress={this.pickLocationHandler}
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}
                //onRegionChange={this.onRegionChange.bind(this)}
                onRegionChange={this.onRegionChange}
                onRegionChangeComplete={this.onRegionChangeComplete}
                customMapStyle={mapStyle}
                //onMarkerSelect= callback for when a marker on map becomes selected
                
                //store a reference to the MapView object so that we can call method animate 
                //to region in the pickLocationHandler
                ref={map => this.map = map}
                //textStyle={{ color: '#bc8b00' }}
                //containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}
            >
                
                {this.state.markers.map((marker, index) => (
                    <MapView.Marker
                        pinColor={'yellow'}
                        onPress={e => console.log(e.nativeEvent)}
                        key={index}
                        coordinate={marker.coordinate}
                        id={marker.id}
                    />
                ))}
            </MapView>

            <View style={styles.zoom}>
                <TouchableOpacity
                    style={styles.zoomIn}
                    onPress={() => { this.onPressZoomIn() }}
                >
                    <Icon
                        name="add"
                        style={styles.icon}
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.zoomOut}
                    onPress={() => { this.onPressZoomOut() }}
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

                <View style={styles.bio}>
                <Text style={styles.bioText}>
                    Bio description lorem ipsum Ullamco exercitation
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
  }
});

export default Mapscreen;
