import React, { Component } from 'react';
import {
    View, Text, ImageBackground, TouchableNativeFeedback,
    Platform, TouchableOpacity, Image, Share
} from 'react-native';
import { postItemStyle, drawerStyle } from '../../styles';
import { CointikoProgressBar } from '../widgets';
import CardView from 'react-native-cardview';
import { decodeHtmlEntity } from '../../utils';
import { connect } from 'react-redux';
import { addToSavedPost, removeFromSavedPost } from '../../actions';
import RNFetchBlob from 'rn-fetch-blob'
class PostListItem extends Component {

    constructor(props) {
        super(props);
        this.base64ImageStr = "";
        this.state = {
            isImageLoading: true,
            // base64ImageStr: ""
        };



    }


    componentDidMount() {
        const { postItemData } = this.props;

        // this.downloadImage(postItemData.id, postItemData._embedded["wp:featuredmedia"][0].source_url);
    }

    downloadImage(id, imageUrl) {
        // console.log('saveing image', imageUrl)
        RNFetchBlob.fetch('GET', imageUrl)
            .then(resp => {
                let status = resp.info().status;
                if (status == 200) {
                    // the conversion is done in native code
                    let base64Str = resp.base64()

                    //     // the following conversions are done in js, it's SYNC
                    // console.log(id, 'base64Str')
                    this.base64ImageStr = 'data:image/jpeg;base64,' + base64Str;
                    // this.setState({
                    //     ...this.state,
                    //     base64ImageStr: 'data:image/jpeg;base64,' + base64Str
                    // })
                } else {
                    // handle other status codes
                }
            }).catch((errorMessage, statusCode) => {
                // error handling
                console.log(errorMessage, id)
            });
    }


    render() {
        const { postItemData, style } = this.props;
        return (
            <CardView
                style={[postItemStyle.itemContainer, style]}
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}>
                {this.renderItemTouchable(postItemData)}
            </CardView>
        );
    }

    renderItemTouchable(postItemData) {
        // TODO : check for undenfine here
        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity
                    onPress={this.onPressItem.bind(this, postItemData.id)}>
                    {this.renderItemContent(postItemData)}
                </TouchableOpacity>
            );
        }
        return (
            <TouchableNativeFeedback
                onPress={this.onPressItem.bind(this, postItemData.id)}>
                {this.renderItemContent(postItemData)}
            </TouchableNativeFeedback >
        );



    }

    onPressItem(postId) {
        let isFromSavedList = this.props.isSavedList;
        const { navigate } = this.props;
        navigate('PostDetailScreen', {
            id: postId,
            isFromSaved: isFromSavedList
        })
    }

    renderItemContent(postItemData) {
        let imageUrl;
        if (postItemData._embedded && postItemData._embedded["wp:featuredmedia"] &&
            postItemData._embedded["wp:featuredmedia"][0] &&
            postItemData._embedded["wp:featuredmedia"][0].media_details &&
            postItemData._embedded["wp:featuredmedia"][0].media_details.sizes &&
            postItemData._embedded["wp:featuredmedia"][0].media_details.sizes["thumbnail"] &&
            postItemData._embedded["wp:featuredmedia"][0].media_details.sizes["thumbnail"].source_url
        ) {
            imageUrl = postItemData._embedded["wp:featuredmedia"][0].media_details.sizes["thumbnail"].source_url;
        }
        console.log('imageUrl', postItemData.id, imageUrl);
        // var imageUrl = postItemData._embedded["wp:featuredmedia"][0].media_details.sizes["thumbnail"].source_url;
        let title = "";
        if (postItemData && postItemData.title && postItemData.title.rendered) {
            title = decodeHtmlEntity(postItemData.title.rendered);
            // title = postItemData.title.rendered
        }
        return (
            <View
                style={postItemStyle.itemTouchable}>
                <ImageBackground
                    defaultSource={require('../../images/logo_app.png')}
                    style={postItemStyle.itemThumbnail}
                    source={{ uri: imageUrl }}
                    onError={() => console.warn('error in loading image', postItemData.id)}
                    onLoadEnd={() => {
                        this.setState({ ...this.state, isImageLoading: false });
                    }}
                >
                    <CointikoProgressBar size={"small"} animating={this.state.isImageLoading} />
                </ImageBackground>
                {/* <Image
                    style={postItemStyle.itemThumbnail}
                    source={{ uri: imageUrl, isStatic: true }} /> */}

                <View style={postItemStyle.itemInfo}>
                    <Text
                        numberOfLines={3}
                        style={postItemStyle.itemTitle}>
                        {title}
                    </Text>
                    <View style={postItemStyle.itemExtra}>
                        <TouchableOpacity onPress={this.onPressSavePost}>
                            <Image
                                style={{ height: 20, width: 20, marginRight: 10 }}
                                source={this.props.isSaved ?
                                    require('../../images/icon_saved.png') :
                                    require('../../images/icon_save.png')
                                } />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressSharePost.bind(this)}>
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={require('../../images/icon_share.png')} />
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        )
    }

    onPressSavePost = () => {
        setTimeout(() => {
            if (this.props.isSaved) {
                // post is saved
                // remove it from saved post list
                this.props.removeFromSavedPost(this.props.postItemData.id);
            } else {
                // post is not saved
                // add it to saved post list
                this.props.addToSavedPost(this.props.postItemData);
            }
        }, 0)

    };

    onPressSharePost() {
        let message = 'Hey! Check out this post on Cointiko\n'
            + this.props.postItemData.title.rendered + '\n'
            + this.props.postItemData.guid.rendered;
        Share.share({ message: message, title: 'Share Post' });
    }

}

const mapStateToProps = state => {
    const { savePostList } = state.save;
    return {
        savePostList
    }
}

export default connect(mapStateToProps, {
    addToSavedPost, removeFromSavedPost
})(PostListItem);