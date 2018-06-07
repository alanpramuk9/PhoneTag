import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import MapScreen from '../screens/mapscreen';
import SplashScreen from '../screens/splashscreen';
import AboutScreen from '../screens/aboutscreen';
import SignInScreen from '../screens/signinscreen';
import SignUpScreen from '../screens/signupscreen';
import ProfileScreen from '../screens/profilescreen';
import LeaderboardScreen from '../screens/leaderboardscreen';
import SettingsScreen from '../screens/settingsscreen';
import CurrentProfileScreen from '../screens/currentprofilescreen';
import LastProfileScreen from '../screens/lastprofilescreen';
import CombinedProfileScreen from '../screens/combinedprofilescreen';




export const ProfileNav = StackNavigator(
    {
        Profile: ProfileScreen,
        Settings: SettingsScreen
    },
    {
        initialRouteName: 'Profile',
    }
)

export const LeaderboardNav = StackNavigator(
    {
        Leaderboard: LeaderboardScreen,
        CurrentProfile: CurrentProfileScreen,
        LastProfile: LastProfileScreen,
        CombinedProfile: CombinedProfileScreen
    },
    {
        initialRouteName: 'Leaderboard',
    }
)

export const SignedIn = TabNavigator(
    {
        Profile: ProfileNav,
        Map: MapScreen,
        Leaderboard: LeaderboardNav,
      },
      {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Profile') {
                iconName = `contact`;
              } else if (routeName === 'Map') {
                iconName = `navigate`;
              } else if (routeName === 'Leaderboard') {
                  iconName = `trophy`;
              }
            
            
              //to add "-outline" for each icon if selected
            // if (routeName === 'Profile') {
            //   iconName = `contact${focused ? '' : '-outline'}`;
            // } else if (routeName === 'Map') {
            //   iconName = `navigate${focused ? '' : '-outline'}`;
            // } else if (routeName === 'Leaderboard') {
            //     iconName = `trophy${focused ? '' : '-outline'}`;
            // }
    
            return <Icon name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
      }
);


export const SignedOut = StackNavigator(
    {
        Splash: {
            screen: SplashScreen
        },
        About: {
            screen: AboutScreen
        },
        SignIn: {
            screen: SignInScreen
        },
        SignUp: {
            screen: SignUpScreen
        },
        Settings: {
            screen: SettingsScreen
        }
    },
    {
        initialRouteName: 'Splash',
    }

)

export const createRootNavigator = (signedIn) => {
    return createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    )
}


