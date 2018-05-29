import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { isLoggedIn } from './services/users';
import { createRootNavigator } from './components/navigator';




export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
    }
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.setState({ signedIn: true })
    }
  }

  render() {
    
    const Layout = createRootNavigator(this.state.signedIn);
    return <Layout />
  }
}





















// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// //import Mapscreen from './components/mapscreen';
// import Navigator from './components/navigator';


// export default class App extends Component{
//   render() {
//     console.log("test2");
//     return (
//       <Navigator />
      
//     );
//   }
// }


