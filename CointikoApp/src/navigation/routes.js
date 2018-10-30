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
    AboutScreen,
    PostDetailScreen,
    BlockchainScreen
} from "../screens";
import Sidemenu from "./SideMenu";



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
    },

    PostDetailScreen: {
        screen: PostDetailScreen,
        navigationOptions: {
            title: 'Details'
        }
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions: {
            title: ScreenTitles.TITLE_ABOUT_SCREEN
        }
    },
})

const BlockchainStack = createStackNavigator({
    BlockchainScreen: {
        screen: BlockchainScreen,
        navigationOptions:
        {
            title: ScreenTitles.TITLE_BLOCKCHAIN_SCREEN,
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: 'white',
            // headerLeft: (
            //     <TouchableOpacity
            //         onPress={() => props.navigation.openDrawer()}
            //     >
            //         <Image
            //             source={require('../images/icon_menu_white.png')}
            //             style={{ width: 24, height: 24, marginLeft: 12 }}
            //         />
            //     </TouchableOpacity>
            // )
        }
    }
});



export const AppStack = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack
        },
        Blockchain: {
            screen: BlockchainStack
        }

    },
    {
        contentComponent: Sidemenu
    }
);


