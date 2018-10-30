import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
// import { withCollapsible } from 'react-navigation-collapsible';
import { ScreenTitles } from "../values";
import { updatePostList } from '../actions';
import { PostListItem, PostListFooter } from "../components/listItems";


import { CointikoProgressBar } from "../components/widgets";
import { initialPostLoaderStyle } from "../styles/LayoutStyles";
import { PostCategoriesCodes } from "../utils";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class BlockchainScreen extends Component {

    constructor(props) {
        super(props);

        this.fetchPostList();
    }

    renderItem = ({ item, index }) => {
        return <PostListItem
            style={index === 1 ? { marginTop: 24 } : {}}
            onPressPostItem={this.onPressPostItem.bind(this, item.id)}
            postItemData={item}
        />
    }


    onPressPostItem(postId) {
        const { navigate } = this.props.navigation;
        navigate('PostDetailScreen', {
            id: postId
        });
    }

    componentDidUpdate() {
        console.log('componendDidUpdateCalled');
    }

    render() {
        console.log('hi', this.props.postList.length > 0);
        if (this.props.errorPostLoading && this.props.postList.length === 0) {

            // there is error in loading blockchain post list and also there is no post in the list
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
            <View style={initialPostLoaderStyle.initialLoaderCointainer}>
                <CointikoProgressBar />
            </View>
        )
    }


    renderRetry() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 12 }}>{this.props.errorBlockchainLoading}</Text>
                <TouchableOpacity
                    onPress={this.onPressRetry.bind(this)}
                    style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
                >
                    <Text style={{ color: 'white', paddingHorizontal: 40, paddingVertical: 14, fontSize: 20 }}>{'Retry'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onPressRetry() {
        this.fetchPostList();

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

    renderPostList() {
        console.log('renderPostList');
        // const { paddingHeight, scrollY, onScroll } = this.props.collapsible;
        let filteredList = this.getBlocklist();
        return (
            <FlatList
                style={{ flex: 1, backgroundColor: 'white' }}
                data={filteredList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(index)}
                // contentContainerStyle={{ paddingTop: paddingHeight }}
                // scrollIndicatorInsets={{ top: paddingHeight }}
                // _mustAddThis={scrollY}
                ListFooterComponent={this.renderPostListFooter.bind(this)}
                // onScroll={onScroll}
                onEndReachedThreshold={0.1}
                onEndReached={this.onLazyLoadPostList.bind(this)}
            />
        );
    }


    getBlocklist() {
        let filteredList = [];
        filteredList = this.props.postList.filter(postItem => {
            if (postItem.categories) {
                let index = postItem.categories.findIndex(item => {
                    return (item === PostCategoriesCodes.BLOCKCHAIN);
                })
                if (index === -1) {
                    return false;
                }
                return true;
            }
        });
        console.log('filteredList', filteredList);
        return filteredList;
    }

    // blockchainList: [], isBlockchainListLoading: false,
    // errorBlockchainLoading: "", isAllBlockchainLoaded: false,

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

    refreshPostList() {

    }

}




const mapStateTopProps = (state) => {
    const { postList, isPostListLoading, featuredPostList, isAllPostLoaded, errorPostLoading } = state.posts;
    return { postList, isPostListLoading, featuredPostList, isAllPostLoaded, errorPostLoading };

}

export default connect(mapStateTopProps, {
    updatePostList
})(BlockchainScreen)


// export default withCollapsible(BlockchainScreenConnect, { iOSCollapsedColor: '#031' });
