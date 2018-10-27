import React, { Component } from 'react';
import { View } from 'react-native';
import { drawerFooter } from '../../styles';

export default class DrawerListFooter extends Component {
    render() {
        return (
            <View style={drawerFooter.footerContainer} />
        )
    }
}