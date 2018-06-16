import { Platform, StyleSheet } from 'react-native';


let Fonts = Platform.select({
    android: {
        Sunflower: 'Sunflower-Medium',
        IndieFlower: 'IndieFlower',
        TCB: 'TCB'
    }, ios: {
        Sunflower: 'Sunflower-Medium',
        IndieFlower: 'IndieFlower',
        TCB: 'TwCenMT-Bold'
    }
 });

 export { Fonts };
