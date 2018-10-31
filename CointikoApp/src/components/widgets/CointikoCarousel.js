import React, { Component } from 'react';
import {
    View, TouchableNativeFeedback, TouchableOpacity,
    StyleSheet, ImageBackground, Text
} from 'react-native';
import CardView from 'react-native-cardview';
import Carousel from 'react-native-carousel-view';
import { featuredPostItemStyle } from '../../styles';

export default class CointikoCarousel extends Component {

    constructor(props) {
        super(props);

        const { featuredPostList } = this.props;
        this.state = {
            featuredPostList: featuredPostList
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <Carousel
                    contentContainerStyle={{ marginLeft: 0 }}
                    height={200}
                    delay={2000}
                    indicatorAtBottom={true}
                    indicatorSize={30}
                    indicatorText='•'
                    inactiveIndicatorText='•'
                    indicatorColor="red"
                    animate={true}
                >
                    {this.renderFeaturedItems()}
                </Carousel>
            </View>
        )

    }

    renderFeaturedItems() {
        return this.props.featuredPostList.map(postItem => {
            // console.warn(postItem);
            return this.renderFeaturedItem(postItem)
        })
    }

    renderFeaturedItem(postItem) {
        var imageUrl = postItem._embedded["wp:featuredmedia"][0].source_url;
        return (
            <View style={featuredPostItemStyle.container} key={postItem.id}>
                <CardView style={featuredPostItemStyle.cardContainer}
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={12}
                >
                    <TouchableOpacity
                        style={featuredPostItemStyle.touchableContainer}
                        onPress={this.onPressItem.bind(this, postItem.id)}>
                        <ImageBackground
                            resizeMode="stretch"
                            style={featuredPostItemStyle.imageContainer}
                            source={{ uri: imageUrl }}
                        >
                            <View style={featuredPostItemStyle.itemContent}>
                                <Text style={featuredPostItemStyle.itemTitle}
                                    numberOfLines={3}
                                    ellipsizeMode="tail"
                                >
                                    {postItem.title.rendered}
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </CardView>
            </View>
        )
    }

    onPressItem(postId) {
        const { navigate } = this.props;
        navigate('PostDetailScreen', {
            id: postId
        });
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        flex: 1
    },

});
