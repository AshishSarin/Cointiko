import React, { Component } from 'react';
import {
    TouchableOpacity, Platform, View,
    TouchableNativeFeedback, Text
} from 'react-native';
import { retryButtonStyle } from '../../styles';
import { ButtonLabels } from '../../values';

export default class RetryButton extends Component {

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
                style={retryButtonStyle.retryContainer}
            >
                <Text style={retryButtonStyle.retryText}>{ButtonLabels.RETRY}</Text>
            </TouchableOpacity>
        );
    }

    renderButtonForAndroid() {

        const { onPressButton } = this.props;
        return (
            <TouchableNativeFeedback
                onPress={onPressButton}
            >
                <View
                    style={retryButtonStyle.retryContainer}
                >
                    <Text style={retryButtonStyle.retryText}>{ButtonLabels.RETRY}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }

}