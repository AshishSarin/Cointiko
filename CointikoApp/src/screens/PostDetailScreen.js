import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Text, Image, WebView } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';


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
            <ScrollView style={{ flex: 1, paddingHorizontal: 24 }}>
                <Image
                    style={{ width: "100%", height: 200 }}
                    source={{ uri: tempImg }} />
                <HTMLView
                    value={tmp2}
                    stylesheet={styles}
                />
            </ScrollView>
        );
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