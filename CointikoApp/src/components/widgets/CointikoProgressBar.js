import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PROGRESS_BAR_COLOR } from '../../values';

class CointikoProgressBar extends Component {
    render() {
        const { style } = this.props;
        return (
            <ActivityIndicator
                size="large"
                color={PROGRESS_BAR_COLOR}
                style={[style]}
                animating={(this.props.animating !== undefined) ? this.props.animating : true} />
        );
    }
}

export default CointikoProgressBar;