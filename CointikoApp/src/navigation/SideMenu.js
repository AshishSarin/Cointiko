import React, { Component } from 'react';
import {
    ScrollView, FlatList, View, Image
} from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { drawerStyle } from '../styles';
import { DrawerItemsLabels, DRAWER_ITEM_SEPERATOR_COLOR, DRAWER_ITEM_COLOR } from '../values';
import { DrawerItem } from '../components/listItems';
import { DrawerItemsIds } from '../utils';
import DrawerListFooter from '../components/listItems/DrawerListFooter';


const logo_height = 70;

const DRAWER_ITEMS = [
    { id: DrawerItemsIds.DRAWER_ITEM_HOME, title: DrawerItemsLabels.DRAWER_ITEM_HOME, routeName: 'HomeTabStack' },
    { id: DrawerItemsIds.DRAWER_ITEM_BLOCKCHAIN, title: DrawerItemsLabels.DRAWER_ITEM_BLOCKCHAIN, routeName: 'BlockchainScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_CRYPTOCURRENCY, title: DrawerItemsLabels.DRAWER_ITEM_CRYPTOCURRENCY, routeName: 'CryptocurrencyScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_MINING, title: DrawerItemsLabels.DRAWER_ITEM_MINING, routeName: 'MiningScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_NEWS, title: DrawerItemsLabels.DRAWER_ITEM_NEWS, routeName: 'NewsScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_WALLETS, title: DrawerItemsLabels.DRAWER_ITEM_WALLETS, routeName: 'WalletsScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_TRADING, title: DrawerItemsLabels.DRAWER_ITEM_TRADING, routeName: 'TradingScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_ABOUT, title: DrawerItemsLabels.DRAWER_ITEM_ABOUT, routeName: 'AboutScreen' },
    // { id: DrawerItemsIds.DRAWER_ITEM_CONTACT, title: DrawerItemsLabels.DRAWER_ITEM_CONTACT, routeName: 'AboutScreen' }
]

export default class Sidemenu extends Component {

    navigateToScreen(route) {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.closeDrawer();
        // this.props.navigation.dispatch('')
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: DrawerItemsIds.DRAWER_ITEM_HOME,
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: DRAWER_ITEM_COLOR }}>
                <SafeAreaView style={drawerStyle.drawerContainer}
                    forceInset={{ top: 'always', horizontal: 'never' }}>
                    {/* <View>
                        <View style={{
                            width: "100%", height: 120,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Image
                                style={{ height: logo_height, width: logo_height * 3.4379 }}
                                source={require('../images/logo_cointiko_1.png')} />
                        </View>
                        <View style={{
                            backgroundColor: DRAWER_ITEM_SEPERATOR_COLOR,
                            height: 1, width: "100%"
                        }}></View>
                    </View> */}
                    {this.renderDrawerItemList()}
                </SafeAreaView>
            </ScrollView>
        );
    }


    renderDrawerItemList() {
        return (
            <FlatList
                data={DRAWER_ITEMS}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <DrawerListFooter />}
                renderItem={({ item }) => {
                    return (
                        <DrawerItem
                            onPressDrawerItem={this.onPressDrawerItem.bind(this, item)}
                            isSelected={this.isItemSelected(item)}
                            drawerItem={item}
                        />
                    );
                }}
            />
        )
    }

    isItemSelected(item) {
        return (item.id === this.state.selectedItemId);
    }

    onPressDrawerItem(item) {
        this.setState({
            ...this.state,
            selectedItemId: item.id
        });
        this.navigateToScreen(item.routeName)
    }



}


