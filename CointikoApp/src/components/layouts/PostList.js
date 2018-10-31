import React, { Component } from "react";
import { View, Text, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity, Animated, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withCollapsible } from 'react-navigation-collapsible';
import { updatePostList } from '../../actions';



import { CointikoProgressBar, CointikoCarousel } from "../widgets";
import { postListStyle } from "../../styles";
import { PostListItem, PostListFooter } from "../listItems";
import { PostCategoriesCodes } from "../../utils";
import { LIST_BACKGROUND_COLOR } from "../../values";
import RetryButton from "../buttons/RetryButton";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class PostList extends Component {

    constructor(props) {
        super(props);

        this.fetchPostList();
    }

    render() {
        if (this.props.errorPostLoading && this.props.postList.length === 0) {

            // there is error in loading post list and also there is no post in the list
            // show a retry button in this case
            return this.renderRetry();
        } else if (this.props.postList.length > 0) {
            return this.renderPostList();
        } else {
            // no error message and post list is still empty
            // must be loading
            return this.renderInitialLoader();
        }
    }

    renderInitialLoader() {
        return (
            <View style={postListStyle.initialLoaderCointainer}>
                <CointikoProgressBar />
            </View>
        )
    }
    renderItem = ({ item, index }) => {
        const { categoryCode } = this.props;
        if (index === 0 && categoryCode === PostCategoriesCodes.HOME) {
            return (
                <View>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        marginHorizontal: 16,
                    }}>Featured Posts</Text>
                    <CointikoCarousel
                        navigate={this.props.navigate}
                        featuredPostList={this.props.featuredPostList}
                    />
                </View>
            );
        }
        return <PostListItem
            style={(index === 1 && categoryCode === PostCategoriesCodes.HOME) ?
                { marginTop: 24 } : {}}
            onPressPostItem={this.onPressPostItem.bind(this, item.id)}
            postItemData={item}
        />
    }



    renderRetry() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 12 }}>{this.props.errorBlockchainLoading}</Text>
                <RetryButton onPressButton={this.onPressRetry.bind(this)} />
            </View>
        )
    }


    renderPostList() {
        const { categoryCode } = this.props;
        if (categoryCode && categoryCode === PostCategoriesCodes.HOME) {
            return this.renderPostListForHome();
        } else {
            return this.renderPostListForCategory();
        }
    }

    renderPostListForHome() {
        const { paddingHeight, onScroll, scrollY } = this.props;
        return (
            <AnimatedFlatList
                style={postListStyle.postListContainer}
                data={this.props.postList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{ paddingTop: paddingHeight }}
                scrollIndicatorInsets={{ top: paddingHeight }}
                _mustAddThis={scrollY}
                ListFooterComponent={this.renderPostListFooter.bind(this)}
                onScroll={onScroll}
                onEndReachedThreshold={0.1}
                onEndReached={this.onLazyLoadPostList.bind(this)}
            />
        );
    }

    renderPostListForCategory() {
        const { categoryCode } = this.props;
        return (
            <FlatList
                style={postListStyle.postListContainer}
                data={this.getBlocklist(categoryCode)}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(index)}
                ListFooterComponent={this.renderPostListFooter.bind(this)}
                onEndReachedThreshold={0.1}
                onEndReached={this.onLazyLoadPostList.bind(this)}
            />
        );
    }

    onPressRetry() {
        this.fetchPostList();

    }

    onPressPostItem(postId) {
        const { navigate } = this.props;
        navigate('PostDetailScreen', {
            id: postId
        });
    }


    fetchPostList() {
        console.log('fetchPostList is called');
        // refresh post list only when it is already not loading
        if (!this.props.isPostListLoading && !this.props.isAllPostLoaded) {
            if (this.props.postList) {
                let offset = (this.props.postList.length !== 0) ? (this.props.postList.length - 1) : this.props.postList.length;
                this.props.updatePostList(offset);
            } else {
                this.props.updatePostList(0);
            }
        }
    }


    getBlocklist(categoryCode) {
        let filteredList = [];
        filteredList = this.props.postList.filter(postItem => {
            if (postItem.categories) {
                let index = postItem.categories.findIndex(item => {
                    return (item === categoryCode);
                })
                if (index === -1) {
                    return false;
                }
                return true;
            }
        });
        return filteredList;
    }


    onLazyLoadPostList() {
        if (!this.props.isPostListLoading && !this.props.errorPostLoading) {

            this.fetchPostList();
        }
    }

    renderPostListFooter() {
        console.log('this.isAllposloaed', this.props.isAllPostLoaded);
        if (this.props.isAllPostLoaded) {
            return (
                <PostListFooter
                    isPostLoading={false}
                    msg={"No more posts to load"}
                />
            );
        } else if (this.props.postList.length > 0 && !this.props.errorPostLoading) {
            return (
                <PostListFooter
                    isPostLoading={this.props.isPostListLoading}
                    msg={"Loading..."}
                />
            );
        } else if (this.props.errorPostLoading) {
            return this.renderRetry();
        }
        else {
            return (
                <PostListFooter
                    isPostLoading={this.props.isPostListLoading}
                    msg={"Error"}
                />
            );
        }
    }
}


const mapStateToProps = (state) => {

    const {
        postList, isPostListLoading,
        featuredPostList, isAllPostLoaded,
        errorPostLoading } = state.posts;
    return {
        postList, isPostListLoading,
        featuredPostList, isAllPostLoaded,
        errorPostLoading
    };

}

export default connect(mapStateToProps, {
    updatePostList
})(PostList)