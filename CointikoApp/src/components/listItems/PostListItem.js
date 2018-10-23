import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { postItemStyle } from '../../styles';
import { CointikoProgressBar } from '../widgets';


class PostListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isImageLoading: true
        };
    }

    render() {
        const { postItemData, onPressPostItem, style } = this.props;
        var defaultImageUri = '../../images/icon_menu.png';
        var imageUrl = postItemData._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
        return (
            <TouchableOpacity
                style={[postItemStyle.itemContainer, style]}
                onPress={onPressPostItem}
            >

                <ImageBackground
                    // defaultSource={require('../../images/icon_menu.png')}
                    style={postItemStyle.itemThumbnail}
                    source={{ uri: imageUrl }}
                    onError={() => console.warn('error')}
                    onLoadEnd={() => {
                        this.setState({ ...this.state, isImageLoading: false });
                    }}
                >

                    <CointikoProgressBar animating={this.state.isImageLoading} />
                </ImageBackground>

                <Text style={postItemStyle.itemTitle}
                >
                    {postItemData.title.rendered}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default PostListItem;