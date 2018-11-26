import React, { Component } from 'react';
import {
    TouchableOpacity, Image, Text
} from 'react-native';
import { drawerStyle } from '../../styles';
import {
    DRAWER_ITEM_TEXT_COLOLR,
    DRAWER_ITEM_SELECTED_TEXT_COLOLR
} from '../../values';
import { DrawerItemsIds } from '../../utils';

export default class DrawerItem extends Component {

    render() {

        const { drawerItem, onPressDrawerItem,
            isSelected } = this.props;
        let textColor = isSelected ? DRAWER_ITEM_SELECTED_TEXT_COLOLR : DRAWER_ITEM_TEXT_COLOLR
        let itemImage = this.getDrawerItemImage(drawerItem.id, isSelected);
        return (
            <TouchableOpacity
                onPress={onPressDrawerItem}
                style={drawerStyle.itemContainer}>
                <Image
                    style={drawerStyle.itemImage}
                    source={itemImage}
                />
                <Text
                    style={[drawerStyle.itemText, { color: textColor }]}>
                    {drawerItem.title}
                </Text>
            </TouchableOpacity>
        )
    }

    getDrawerItemImage(drawerItemId, isSelected) {
        switch (drawerItemId) {
            case DrawerItemsIds.DRAWER_ITEM_HOME:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_home.png') :
                    require('../../images/icon_drawer_item_home.png');
            case DrawerItemsIds.DRAWER_ITEM_BLOCKCHAIN:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_blockchain.png') :
                    require('../../images/icon_drawer_item_blockchain.png');
            case DrawerItemsIds.DRAWER_ITEM_CRYPTOCURRENCY:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_cryptocurrency.png') :
                    require('../../images/icon_drawer_item_cryptocurrency.png');
            case DrawerItemsIds.DRAWER_ITEM_MINING:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_mining.png') :
                    require('../../images/icon_drawer_item_mining.png');
            case DrawerItemsIds.DRAWER_ITEM_NEWS:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_news.png') :
                    require('../../images/icon_drawer_item_news.png');
            case DrawerItemsIds.DRAWER_ITEM_WALLETS:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_wallets.png') :
                    require('../../images/icon_drawer_item_wallets.png');
            case DrawerItemsIds.DRAWER_ITEM_TRADING:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_trading.png') :
                    require('../../images/icon_drawer_item_trading.png');
            case DrawerItemsIds.DRAWER_ITEM_ABOUT:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_about.png') :
                    require('../../images/icon_drawer_item_about.png');
            case DrawerItemsIds.DRAWER_ITEM_CONTACT:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_contact.png') :
                    require('../../images/icon_drawer_item_contact.png');
            default:
                return isSelected ?
                    require('../../images/icon_drawer_item_selected_home.png') :
                    require('../../images/icon_drawer_item_home.png');
        }
    }
}