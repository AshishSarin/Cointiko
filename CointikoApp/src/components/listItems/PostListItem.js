import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { postItemStyle } from '../../styles';


class PostListItem extends Component {
    render() {
        const { postItemData } = this.props;
        var imageUrl = postItemData._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
        return (
            <TouchableOpacity style={postItemStyle.itemContainer}>
                <Image
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