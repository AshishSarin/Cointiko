import React, { Component } from 'react';
import {
    TouchableOpacity, Image, Text
} from 'react-native';
import { drawerStyle } from '../../styles';

export default class DrawerItem extends Component {

    render() {
        const { drawerItem, onPressDrawerItem, itemImage } = this.props;
        return (
            <TouchableOpacity
                onPress={onPressDrawerItem}
                style={drawerStyle.itemContainer}>
                <Image
                    style={drawerStyle.itemImage}
                    source={itemImage}
                />
                <Text
                    style={drawerStyle.itemText}>
                    {drawerItem.title}
                </Text>
            </TouchableOpacity>
        )
    }
}