import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { CointikoProgressBar } from '../widgets';


export default class PostListFooter extends Component {
    render() {
        const { isPostLoading, msg } = this.props;
        return (
            <View style={{
                height: 100, backgroundColor: 'white', justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.renderLoader(isPostLoading, msg)}
            </View>
        )
    }


    renderLoader(isPostLoading, msg) {
        if (isPostLoading)
            return <CointikoProgressBar />
        else {
            return <Text>{msg}</Text>
        }
    }
}