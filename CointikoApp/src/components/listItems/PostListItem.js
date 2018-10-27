import React, { Component } from 'react';
import {
    View, Text, ImageBackground, TouchableNativeFeedback,
    Platform, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { postItemStyle, drawerStyle } from '../../styles';
import { CointikoProgressBar } from '../widgets';
import CardView from 'react-native-cardview';

class PostListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isImageLoading: true
        };
    }

    render() {
        const { postItemData, onPressPostItem, style } = this.props;
        return (
            <CardView
                style={[postItemStyle.itemContainer, style]}
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}>
                {this.renderItemTouchable(postItemData, onPressPostItem)}
            </CardView>
        );
    }

    renderItemTouchable(postItemData, onPressPostItem) {
        // var defaultImageUri = '../../images/icon_menu.png';
        // TODO : check for undenfine here
        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity
                    style={postItemStyle.itemTouchable}
                    onPress={onPressPostItem} >
                    {this.renderItemContent(postItemData)}
                </TouchableOpacity>
            );
        }
        return (
            <TouchableNativeFeedback
                onPress={onPressPostItem}>
                {this.renderItemContent(postItemData)}
            </TouchableNativeFeedback >
        );



    }

    renderItemContent(postItemData) {
        var imageUrl = postItemData._embedded["wp:featuredmedia"][0].media_details.sizes["thumbnail"].source_url;

        return (
            <View
                style={postItemStyle.itemTouchable}>
                <ImageBackground
                    defaultSource={require('../../images/icon_menu.png')}
                    style={postItemStyle.itemThumbnail}
                    source={{ uri: imageUrl }}
                    onError={() => console.warn('error')}
                    onLoadEnd={() => {
                        this.setState({ ...this.state, isImageLoading: false });
                    }}
                >
                    <CointikoProgressBar size={"small"} animating={this.state.isImageLoading} />
                </ImageBackground>

                <Text style={postItemStyle.itemTitle}>
                    {postItemData.title.rendered}
                </Text>
            </View>
        )
    }
}

export default PostListItem;