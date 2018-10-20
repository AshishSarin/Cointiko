import {
    createDrawerNavigator, createStackNavigator,
    createMaterialTopTabNavigator
} from "react-navigation";
import React from "react";
import { Image, TouchableOpacity } from 'react-native';
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import MarketScreen from "../screens/MarketScreen";
import { collapsibleOptionsForTab, collapsibleTabConfig } from 'react-navigation-collapsible';
import { ScreenTitles } from "../values";



const HomeTabStack = createMaterialTopTabNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,

        },
        MarketScreen: {
            screen: MarketScreen,

        },

    },
    collapsibleTabConfig({
        navigationOptions: {
            tabBarOptions: {
                indicatorStyle: { backgroundColor: 'white' },
                style: { backgroundColor: 'blue' },
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
                headerStyle: { backgroundColor: 'green' },
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => props.navigation.openDrawer()}
                    >
                        <Image
                            source={require('../images/icon_menu.png')}
                            style={{ width: 24, height: 24 }}
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


