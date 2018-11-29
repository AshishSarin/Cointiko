import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { postDetailStyle } from '../styles';
import { formatDate, decodeHtmlEntity } from '../utils/Utils';
import { ScreenTitles, COINTIKO_HEADER_COLOR, COINTIKO_HEADER_TINT_COLOR } from '../values';
import { CointikoStatusBar } from '../components/widgets';
import { savePost } from '../actions';


class PostDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: ScreenTitles.TITLE_POST_DETAIL_SCREEN,
            headerStyle: { backgroundColor: COINTIKO_HEADER_COLOR },
            headerTintColor: COINTIKO_HEADER_TINT_COLOR,
            headerRight: (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={navigation.getParam('onPressSavePost')}
                    >
                        <Text>
                            {navigation.getParam('_isPostSaved') ? 'saved' : 'save'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => alert('Shared')}
                    >
                        <Text>Share</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        this.text = "saved";
        const { navigation } = this.props;
        const postId = navigation.getParam('id', 0);

        let data = this.props.postList.find(post => post.id === postId);

        let _isSaved = this.isPostSaved(postId);

        this.state = {
            postData: data,
            isSaved: _isSaved
        }

    }

    isPostSaved(postId) {
        return this.props.savePostList.findIndex(postItem => postItem.id === postId) !== -1;
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onPressSavePost: this.onPressSavePost,
            _isPostSaved: this.state.isSaved
        });
    }

    render() {


        var htmlContent = this.state.postData.content.rendered;
        var tmp = htmlContent.replace(/<img .*?>/, "");
        var tmp2 = tmp.replace("<p></p>", "");
        tmp2 = tmp2.replace("<h1></h1>", "");
        var tempImg = this.state.postData._embedded["wp:featuredmedia"][0].source_url;
        return (
            <View style={{ flex: 1 }}>
                <CointikoStatusBar />
                <ScrollView style={postDetailStyle.container}>
                    {this.renderPostTitle()}
                    {this.renderPostMetaData()}
                    <Image
                        style={postDetailStyle.postImage}
                        source={{ uri: tempImg }} />
                    <HTMLView
                        value={tmp2}
                        stylesheet={styles}
                    />
                </ScrollView>
            </View>
        );
    }

    renderPostMetaData() {
        let author = "admin";
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
        console.warn('Saved')
        this.props.savePost(this.state.postData);
        this.props.navigation.setParams({ _isPostSaved: true })
    };

}

const styles = StyleSheet.create({

    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
});

const mapStateToProps = (state) => {
    const { postList } = state.posts;
    const { savePostList } = state.save;
    return { postList, savePostList };
}


export default connect(mapStateToProps, {
    savePost
})(PostDetailScreen)