import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';


export default class PostListFooter extends Component {
    render() {
        const { isPostLoading } = this.props;
        return (
            <View style={{
                height: 100, backgroundColor: 'white', justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.renderLoader(isPostLoading)}
            </View>
        )
    }


    renderLoader(isPostLoading) {
        if (isPostLoading)
            return <ActivityIndicator size='large' />
        else {
            return <Text>No more posts to load</Text>
        }
    }
}