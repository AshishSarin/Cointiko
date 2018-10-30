import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Text, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { postDetailStyle } from '../styles';
import { formatDate } from '../utils/Utils';


class PostDetailScreen extends Component {


    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const postId = navigation.getParam('id', 0);

        let data = this.props.postList.find(post => post.id === postId);

        this.state = {
            postData: data
        }

    }

    render() {


        var htmlContent = this.state.postData.content.rendered;
        var tmp = htmlContent.replace(/<img .*?>/, "");
        var tmp2 = tmp.replace("<p></p>", "");
        tmp2 = tmp2.replace("<h1></h1>", "");
        var tempImg = this.state.postData._embedded["wp:featuredmedia"][0].source_url;
        return (
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
            return (
                <Text style={postDetailStyle.postTitle}>
                    {this.state.postData.title.rendered}
                </Text>
            );
        }
    }

}

const styles = StyleSheet.create({

    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
});

const mapStateToProps = (state) => {
    const { postList } = state.posts;
    return { postList };
}


export default connect(mapStateToProps, {})(PostDetailScreen)