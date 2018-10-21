import {
    createDrawerNavigator, createStackNavigator,
    createMaterialTopTabNavigator
} from "react-navigation";
import React from "react";
import { Image, TouchableOpacity } from 'react-native';

import { collapsibleOptionsForTab, collapsibleTabConfig } from 'react-navigation-collapsible';
import { ScreenTitles } from "../values";
import {
    HomeScreen, MarketScreen, ConverterScreen,
    AboutScreen
} from "../screens";



const HomeTabStack = createMaterialTopTabNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,

        },
        MarketScreen: {
            screen: MarketScreen,

        },

        ConverterScreen: {
            screen: ConverterScreen
        },

    },
    collapsibleTabConfig({
        navigationOptions: {
            tabBarOptions: {
                indicatorStyle: { backgroundColor: 'white' },
                style: { backgroundColor: 'blue' },
                scrollEnabled: true
            }
        }
    })
)



const HomeStack = createStackNavigator({
    HomeTabStack: {
        screen: HomeTabStack,
        navigationOptions: props => collapsibleOptionsForTab(props,
            {
                title: ScreenTitles.TITLE_HOME_SCREEN,
                headerStyle: { backgroundColor: 'blue' },
                headerTintColor: 'white',
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => props.navigation.openDrawer()}
                    >
                        <Image
                            source={require('../images/icon_menu_white.png')}
                            style={{ width: 24, height: 24, marginLeft: 12 }}
                        />
                    </TouchableOpacity>
                )
            })
    }
})




const AboutStack = createStackNavigator({
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions: {
            title: ScreenTitles.TITLE_ABOUT_SCREEN
        }
    },
})

export const AppStack = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },

    About: {
        screen: AboutStack
    }
})


