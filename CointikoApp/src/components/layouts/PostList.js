import React, { Component } from "react";
import {
    View, Text, FlatList, RefreshControl,
    ImageBackground, ActivityIndicator,
    TouchableOpacity, Animated,
    Image, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { withCollapsible } from 'react-navigation-collapsible';
import { updatePostList, savePost } from '../../actions';



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
        this.state = {
            refreshing: false,
            isRefreshed: false,
        };
    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 5000);
    }


    render() {

        if (this.props.isSavedList) {
            return this.renderPostListForSaved();
        }

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
                { marginTop: 24 } : { marginTop: 16 }}
            isSaved={this.isPostSaved(item.id)}
            postItemData={item}
            navigate={this.props.navigate}
            isSavedList={this.props.isSavedList}
        />
    }


    isPostSaved(postId) {
        return this.props.savePostList.findIndex(postItem => postItem.id === postId) !== -1;
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
        }
        else {
            return this.renderPostListForCategory();
        }
    }

    renderPostListForHome() {
        const { paddingHeight, onScroll, scrollY } = this.props;
        return (
            <View style={{ flex: 1, marginTop: 12 }}>
                <AnimatedFlatList
                    style={postListStyle.postListContainer}
                    data={this.props.postList}
                    renderItem={this.renderItem}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={this._onRefresh}
                    //         progressViewOffset={100}
                    //     />
                    // }
                    // extraData={this.props.savePostList}
                    keyExtractor={(item, index) => String(index)}
                    contentContainerStyle={{ paddingTop: paddingHeight }}
                    scrollIndicatorInsets={{ top: paddingHeight }}
                    _mustAddThis={scrollY}
                    ListFooterComponent={this.renderPostListFooter.bind(this)}
                    onScroll={onScroll}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onLazyLoadPostList.bind(this)}
                />
            </View>
        );
    }


    renderPostListForSaved() {
        const { paddingHeight, onScroll, scrollY } = this.props;
        if (this.props.savePostList.length > 0) {
            return (
                <View style={{ flex: 1, marginTop: 0, backgroundColor: 'blue' }}>
                    <AnimatedFlatList
                        style={[postListStyle.postListContainer, { paddingTop: 0 }]}
                        data={this.props.savePostList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => String(index)}
                        contentContainerStyle={{ paddingTop: paddingHeight }}
                        scrollIndicatorInsets={{ top: paddingHeight }}
                        _mustAddThis={scrollY}
                        onScroll={onScroll}
                    />
                </View>
            );
        } else {
            // render empty message
            return this.renderEmptyForSaved();
        }
    }

    renderEmptyForSaved() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: LIST_BACKGROUND_COLOR
            }}>
                <Text>No saved posts here...</Text>
            </View>
        );
    }

    renderPostListForCategory() {
        const { categoryCode } = this.props;
        return (
            <FlatList
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this._onRefresh}
                //     />
                // }
                style={postListStyle.postListContainer}
                data={this.getFilteredCategoryList(categoryCode)}
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

        // this.props.savePost(postId);

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


    getFilteredCategoryList(categoryCode) {
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
    const { savePostList } = state.save;
    return {
        postList, isPostListLoading, savePostList,
        featuredPostList, isAllPostLoaded,
        errorPostLoading
    };

}

export default connect(mapStateToProps, {
    updatePostList,
    savePost
})(PostList)