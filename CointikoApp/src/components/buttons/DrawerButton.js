import React, { Component } from 'react';
import {
    TouchableOpacity, TouchableNativeFeedback,
    Image, View, Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';



export default class DrawerButton extends Component {
    render() {
        if (Platform.OS === 'ios') {
            return this.renderButtonForiOS();
        } else {
            return this.renderButtonForAndroid();
        }
    }


    renderButtonForiOS() {
        const { onPressButton } = this.props;
        return (
            <TouchableOpacity
                onPress={onPressButton}
            >
                <Image
                    source={require('../../images/icon_menu_white.png')}
                    style={{ width: 24, height: 24, marginLeft: 12 }}
                />
            </TouchableOpacity>
        )
    }

    renderButtonForAndroid() {
        console.log(this.props);
        const { onPressButton } = this.props;
        return (
            <TouchableNativeFeedback
                onPress={onPressButton}
            >
                <View>
                    <Image
                        source={require('../../images/icon_menu_white.png')}
                        style={{ width: 24, height: 24, marginLeft: 12 }}
                    />
                </View>
            </TouchableNativeFeedback>
        )
    }
}