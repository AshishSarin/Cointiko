import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { postItemStyle } from '../../styles';


class PostListItem extends Component {
    render() {
        const { postItemData, onPressPostItem, style } = this.props;
        var defaultImageUri = '../../images/icon_menu.png';
        var imageUrl = postItemData._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
        return (
            <TouchableOpacity
                style={[postItemStyle.itemContainer, style]}
                onPress={onPressPostItem}
            >
                <Image
                    defaultSource={require('../../images/icon_menu.png')}
                    style={postItemStyle.itemThumbnail}
                    source={{ uri: imageUrl }}
                />
                <Text style={postItemStyle.itemTitle}
                >
                    {postItemData.title.rendered}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default PostListItem;