import React, { Component } from 'react';
import {
    ScrollView, FlatList
} from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { drawerStyle } from '../styles';
import { DrawerItemsLabels } from '../values';
import { DrawerItem } from '../components/listItems';
import { DrawerItemsIds } from '../utils';
import DrawerListFooter from '../components/listItems/DrawerListFooter';


const DRAWER_ITEMS = [
    { id: DrawerItemsIds.DRAWER_ITEM_HOME, title: DrawerItemsLabels.DRAWER_ITEM_HOME, routeName: 'HomeTabStack' },
    { id: DrawerItemsIds.DRAWER_ITEM_BLOCKCHAIN, title: DrawerItemsLabels.DRAWER_ITEM_BLOCKCHAIN, routeName: 'BlockchainScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_CRYPTOCURRENCY, title: DrawerItemsLabels.DRAWER_ITEM_CRYPTOCURRENCY, routeName: 'CryptocurrencyScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_MINING, title: DrawerItemsLabels.DRAWER_ITEM_MINING, routeName: 'MiningScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_NEWS, title: DrawerItemsLabels.DRAWER_ITEM_NEWS, routeName: 'NewsScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_WALLETS, title: DrawerItemsLabels.DRAWER_ITEM_WALLETS, routeName: 'WalletsScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_TRADING, title: DrawerItemsLabels.DRAWER_ITEM_TRADING, routeName: 'TradingScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_ABOUT, title: DrawerItemsLabels.DRAWER_ITEM_ABOUT, routeName: 'AboutScreen' },
    { id: DrawerItemsIds.DRAWER_ITEM_CONTACT, title: DrawerItemsLabels.DRAWER_ITEM_CONTACT, routeName: 'AboutScreen' }
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

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={drawerStyle.drawerContainer}
                    forceInset={{ top: 'always', horizontal: 'never' }}>
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
                            onPressDrawerItem={this.onPressDrawerItem.bind(this, item.routeName)}
                            itemImage={this.getDrawerItemImage(item.id)}
                            drawerItem={item}
                        />
                    );
                }}
            />
        )
    }

    onPressDrawerItem(routeName) {
        this.navigateToScreen(routeName)
    }

    getDrawerItemImage(drawerItemId) {
        switch (drawerItemId) {
            case DrawerItemsIds.DRAWER_ITEM_HOME:
                return require('../images/icon_drawer_item_home.png');
            case DrawerItemsIds.DRAWER_ITEM_BLOCKCHAIN:
                return require('../images/icon_drawer_item_blockchain.png');
            case DrawerItemsIds.DRAWER_ITEM_CRYPTOCURRENCY:
                return require('../images/icon_drawer_item_cryptocurrency.png');
            case DrawerItemsIds.DRAWER_ITEM_MINING:
                return require('../images/icon_drawer_item_mining.png');
            case DrawerItemsIds.DRAWER_ITEM_NEWS:
                return require('../images/icon_drawer_item_news.png');
            case DrawerItemsIds.DRAWER_ITEM_WALLETS:
                return require('../images/icon_drawer_item_wallets.png');
            case DrawerItemsIds.DRAWER_ITEM_TRADING:
                return require('../images/icon_drawer_item_trading.png');
            case DrawerItemsIds.DRAWER_ITEM_ABOUT:
                return require('../images/icon_drawer_item_about.png');
            case DrawerItemsIds.DRAWER_ITEM_CONTACT:
                return require('../images/icon_drawer_item_contact.png');
            default:
                return require('../images/icon_drawer_item_home.png');
        }
    }

}


