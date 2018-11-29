import {
    createDrawerNavigator, createStackNavigator,
    createMaterialTopTabNavigator
} from "react-navigation";
import React from "react";
import { Image } from 'react-native';
import { Header } from 'react-navigation';


import { collapsibleOptionsForTab, collapsibleTabConfig } from 'react-navigation-collapsible';
import { ScreenTitles, COINTIKO_HEADER_TINT_COLOR, COINTIKO_HEADER_COLOR } from "../values";
import {
    HomeScreen, MarketScreen, ConverterScreen,
    AboutScreen, PostDetailScreen, BlockchainScreen,
    CryptocurrencyScreen,
    MiningScreen,
    NewsScreen,
    WalletsScreen
} from "../screens";
import Sidemenu from "./SideMenu";
import { DrawerButton } from "../components/buttons";
import TradingScreen from "../screens/TradingScreen";



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
                indicatorStyle: { backgroundColor: '#3997F7' },
                labelStyle: { color: 'black' },
                style: { backgroundColor: COINTIKO_HEADER_COLOR, color: 'black' },
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
                // title: ScreenTitles.TITLE_HOME_SCREEN,
                headerTitleStyle: { alignItem: 'center', justifyContent: 'center' },
                headerTitle:
                    <Image
                        style={{ width: (Header.HEIGHT - 20) * 3.4379, height: (Header.HEIGHT - 20) }}
                        resizeMode="contain"
                        source={require('../images/logo_cointiko.png')}
                    />,
                headerStyle: { backgroundColor: COINTIKO_HEADER_COLOR, marginLeft: 0 },
                headerTintColor: COINTIKO_HEADER_TINT_COLOR,
                headerLeft: (
                    <DrawerButton
                        onPressButton={() => {
                            // console.warn(Header.HEIGHT);
                            props.navigation.openDrawer();
                        }}
                    />
                )
            })
    },

    BlockchainScreen: {
        screen: BlockchainScreen,
    },

    PostDetailScreen: {
        screen: PostDetailScreen,
    },

    CryptocurrencyScreen: {
        screen: CryptocurrencyScreen,

    },
    MiningScreen: {
        screen: MiningScreen,

    },
    NewsScreen: {
        screen: NewsScreen,

    },
    WalletsScreen: {
        screen: WalletsScreen,

    },
    TradingScreen: {
        screen: TradingScreen,

    },


    AboutScreen: {
        screen: AboutScreen,
        // navigationOptions: {
        //     title: ScreenTitles.TITLE_ABOUT_SCREEN
        // }
    },
}, {
        initialRouteName: 'HomeTabStack'
    });



const CryptocurrencyStack = createStackNavigator({
    CryptocurrencyScreen: {
        screen: CryptocurrencyScreen,
    }
});



export const AppStack = createDrawerNavigator(
    {
        Home: {
            screen: HomeStack
        },

    },
    {
        contentComponent: Sidemenu
    }
);


