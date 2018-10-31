import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { COINTIKO_STATUSBAR_COLOR } from '../../values';


export default class CointikoStatusBar extends Component {
    render() {
        return (
            <StatusBar
                backgroundColor={COINTIKO_STATUSBAR_COLOR}
                barStyle="light-content" />
        )
    }
}