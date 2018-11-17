import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { CointikoProgressBar } from '../widgets';
import { postListFooterStyle } from '../../styles';


export default class PostListFooter extends Component {
    render() {
        const { isPostLoading, msg } = this.props;
        return (
            <View style={postListFooterStyle.footerContainer}>
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