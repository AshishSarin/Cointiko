import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, View, TouchableOpacity,
    Text, Image, Share, FlatList
} from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { postDetailStyle } from '../styles';
import { formatDate, decodeHtmlEntity } from '../utils/Utils';
import { ScreenTitles, COINTIKO_HEADER_COLOR, COINTIKO_HEADER_TINT_COLOR } from '../values';
import { CointikoStatusBar } from '../components/widgets';
import { addToSavedPost, removeFromSavedPost } from '../actions';
import RNFetchBlob from 'rn-fetch-blob'
import { LIST_BACKGROUND_COLOR } from '../values';

import { PostListItem } from '../components/listItems';

class PostDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: ScreenTitles.TITLE_POST_DETAIL_SCREEN,
            headerStyle: { backgroundColor: COINTIKO_HEADER_COLOR },
            headerTintColor: COINTIKO_HEADER_TINT_COLOR,
            headerRight: (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={navigation.getParam('onPressSavePost')}
                    >
                        <Image
                            style={{ height: 24, width: 24 }}
                            source={navigation.getParam('_isPostSaved')
                                ? require('../images/icon_saved.png') :
                                require('../images/icon_save.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginRight: 15 }}
                        onPress={navigation.getParam('onPressSharePost')}
                    >
                        <Image
                            style={{ height: 24, width: 24 }}
                            source={require('../images/icon_share.png')} />
                    </TouchableOpacity>
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const postId = navigation.getParam('id', 0);


        const isFromSaved = navigation.getParam('isFromSaved', false);

        let data = null;
        if (isFromSaved) {
            // detail screen is opened from saved list
            data = this.props.savePostList.find(post => post.id === postId);
        }
        else {
            data = this.props.postList.find(post => post.id === postId);
        }
        let relatedPostList = [];
        if (data && !isFromSaved) {
            relatedPostList = this.getRelatedPostList(data);
        }

        let _isSaved = this.isPostSaved(postId);
        this.state = {
            isFromSaved: isFromSaved,
            postData: data,
            isSaved: _isSaved,
            imageBase64: "",
            relatedPostList: relatedPostList
        }

        // this.downloadImage(data._embedded["wp:featuredmedia"][0].source_url);

    }


    downloadImage(imageUrl) {
        console.warn('saveing image')
        RNFetchBlob.fetch('GET', imageUrl)
            .then(resp => {
                let status = resp.info().status;
                console.warn('hi')
                if (status == 200) {
                    // the conversion is done in native code
                    let base64Str = resp.base64()
                    //     // the following conversions are done in js, it's SYNC
                    console.log(base64Str)
                    this.setState({
                        ...this.state,
                        imageBase64: 'data:image/jpeg;base64,' + base64Str
                    })
                } else {
                    // handle other status codes
                }
            }).catch((errorMessage, statusCode) => {
                // error handling
                console.warn(errorMessage, statusCode)
            });
    }


    isPostSaved(postId) {
        return this.props.savePostList.findIndex(postItem => postItem.id === postId) !== -1;
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onPressSavePost: this.onPressSavePost,
            onPressSharePost: this.onPressSharePost.bind(this),
            _isPostSaved: this.state.isSaved
        });
    }



    render() {

        if (this.state.postData) {
            var htmlContent = this.state.postData.content.rendered;
            var tmp = htmlContent.replace(/<img .*?>/, "");
            var tmp2 = tmp.replace("<p></p>", "");
            tmp2 = tmp2.replace("<h1></h1>", "");
            var tempImg = this.state.postData._embedded["wp:featuredmedia"][0].source_url;
            return (
                <View style={{ flex: 1 }}>
                    <CointikoStatusBar />
                    <ScrollView style={postDetailStyle.container}>
                        <View style={postDetailStyle.postContainer}>
                            {this.renderPostTitle()}
                            {this.renderPostMetaData()}
                            <Image

                                style={postDetailStyle.postImage}
                                source={{ uri: tempImg }} />
                            <HTMLView
                                value={tmp2}
                                stylesheet={styles}
                            />

                        </View>
                        {this.renderRelatedPosts()}
                    </ScrollView>
                </View>
            );
        }
        return <Text>Error in loading post data</Text>
    }




    renderRelatedPosts() {
        if (!this.state.isFromSaved) {
            return (
                <View style={{
                    backgroundColor: LIST_BACKGROUND_COLOR, flex: 1,
                    paddingTop: 20, paddingBottom: 16, flex: 1, marginBottom: 16
                }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24, marginLeft: 16, }}>
                        Related Posts
                </Text>
                    <FlatList
                        // style={postListStyle.postListContainer}
                        data={this.state.relatedPostList}
                        extraData={this.props.savePostList}
                        renderItem={this.renderRelatedPostItem}
                        keyExtractor={(item, index) => String(index)}
                    />
                </View>
            )
        }
    }


    renderRelatedPostItem = ({ item, index }) => {
        return <PostListItem
            style={index === 0 ? { marginTop: 8 } : { marginTop: 16 }}
            isSaved={this.isPostSaved(item.id)}
            postItemData={item}
            navigate={this.props.navigation.push}
        />
    }


    onPressPostItem(itemId) {
        console.warn(itemId);
        const { push } = this.props.navigation;
        push('PostDetailScreen', {
            id: itemId
        });
    }


    getRelatedPostList(postData) {
        let filteredList = [];
        let relatedPostList = [];
        if (postData.categories && postData.categories.length > 0) {
            let categoryCode = postData.categories[0];
            filteredList = this.props.postList.filter(postItem => {
                if (postItem.categories) {
                    let index = postItem.categories.findIndex(item => item === categoryCode);
                    if (index === -1 || postItem.id === postData.id) {
                        return false;
                    }
                    return true;
                }
            });

        }

        relatedPostList = filteredList.slice(0, 4);
        return relatedPostList;
    }





    renderPostMetaData() {
        let author = "Admin";
        let date = "";
        if (this.state.postData && this.state.postData.date) {
            date = formatDate(this.state.postData.date);
        }
        let metaData = "By " + author + " - Cointiko | " + date;
        return (
            <Text style={postDetailStyle.postMetaData}>
                {metaData}
            </Text>
        )
    }

    renderPostTitle() {
        if (this.state.postData && this.state.postData.title
            && this.state.postData.title.rendered) {
            let title = decodeHtmlEntity(this.state.postData.title.rendered);
            return (
                <Text style={postDetailStyle.postTitle}>
                    {title}
                </Text>
            );
        }
    }

    onPressSavePost = () => {
        if (this.state.isSaved) {
            // post is saved
            // remove it from saved post list

            // set isSaved state to false
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    isSaved: false
                }, () => {
                    // call action to remove post
                    this.props.removeFromSavedPost(this.state.postData.id);

                    // change param for navigation header to change icon
                    this.props.navigation.setParams({ _isPostSaved: false })
                })
            }, 0)

        } else {
            // post is not saved
            // add it to saved post list

            // set isSaved state to true
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    isSaved: true
                }, () => {
                    // call action to save post
                    this.props.addToSavedPost(this.state.postData);

                    // change param for navigation header to change icon
                    this.props.navigation.setParams({ _isPostSaved: true })
                });
            }, 0)


        }
    };

    onPressSharePost() {
        let message = 'Hey! Check out this post on Cointiko\n'
            + this.state.postData.title.rendered + '\n'
            + this.state.postData.guid.rendered;
        Share.share({ message: message, title: 'Share Post' });
    }

}

const styles = StyleSheet.create({

    a: {
        fontWeight: '300',
        color: '#0000EE', // make links coloured pink
    },
    p: {
        fontWeight: '100',
        color: 'black'
    }
});

const mapStateToProps = (state) => {
    const { postList } = state.posts;
    const { savePostList } = state.save;
    return { postList, savePostList };
}


export default connect(mapStateToProps, {
    addToSavedPost, removeFromSavedPost
})(PostDetailScreen)