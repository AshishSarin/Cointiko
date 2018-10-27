import React, { Component } from "react";
import { View, Text, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity, Animated, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withCollapsible } from 'react-navigation-collapsible';
import { updateDemoState } from '../actions/HomeActions';
import { ScreenTitles } from "../values";
import { updatePostList } from '../actions';
import { PostListItem, PostItemSeperator, PostListFooter } from "../components/listItems";

import Carousel from 'react-native-carousel-view';
import { CointikoProgressBar } from "../components/widgets";
import { initialPostLoaderStyle } from "../styles/LayoutStyles";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class HomeScreen extends Component {

    static navigationOptions = {
        title: ScreenTitles.TITLE_NEWS_TAB,
    };
    constructor(props) {
        super(props);

        if (this.props.postList) {
            let offset = (this.props.postList.length !== 0) ? (this.props.postList.length - 1) : this.props.postList.length;
            this.props.updatePostList(offset);
        } else {
            this.props.updatePostList(0);
        }
    }

    renderItem = ({ item, index }) => {
        if (index === 0) {
            return this.renderCarousel();
        }
        return <PostListItem
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

    renderCarousel() {
        return (
            <View style={styles.container}>
                <Carousel
                    height={200}
                    delay={2000}
                    indicatorAtBottom={true}
                    indicatorSize={30}
                    indicatorText='•'
                    inactiveIndicatorText='•'
                    indicatorColor="red"
                    animate={false}
                >

                    <View style={styles.contentContainer}>
                        <Image
                            style={{ height: 200, width: "100%" }}
                            source={{ uri: 'https://www.cointiko.com/wp-content/uploads/2018/10/bitcoin-news-now-1.jpg' }}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <ImageBackground
                            source={{ uri: 'https://www.cointiko.com/wp-content/uploads/2018/10/bitcoin-news-now-1.jpg' }}
                            style={styles.image}
                        >

                            <Text
                                style={styles.paragraph}
                            >
                                TITLE
                                </Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text>Page 3</Text>
                    </View>
                </Carousel>
            </View>
        )

    }




    render() {
        if (this.props.errorPostLoading && this.props.postList.length === 0) {

            // there is error in loading post and also there is no post in the list
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
                <Text style={{ marginBottom: 12 }}>{this.props.errorPostLoading}</Text>
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
        if (this.props.postList) {

            let offset = (this.props.postList.length !== 0) ? (this.props.postList.length - 1) : this.props.postList.length;
            console.warn('this.props.postList', this.props.postList.length);
            this.props.updatePostList(offset);
        } else {
            this.props.updatePostList(0);
        }
    }



    renderPostList() {
        const { paddingHeight, scrollY, onScroll } = this.props.collapsible;
        return (
            <AnimatedFlatList
                style={{ flex: 1, backgroundColor: 'white' }}
                data={this.props.postList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(index)}
                ItemSeparatorComponent={() => <PostItemSeperator />}
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

    onLazyLoadPostList() {
        if (!this.props.isPostListLoading && !this.props.errorPostLoading) {

            let offset = (this.props.postList.length !== 0) ? (this.props.postList.length - 1) : this.props.postList.length;
            this.props.updatePostList(offset);
        }
    }

    renderPostListFooter() {
        if (this.props.isAllPostLoaded) {
            return (
                <PostListFooter
                    isPostLoading={this.props.isPostListLoading}
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

const styles = StyleSheet.create({
    image: {
        flexGrow: 1,
        height: 200,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    paragraph: {
        textAlign: 'center',
        color: 'white',
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    contentContainer: {
        borderWidth: 2,
        borderColor: '#CCC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});


const mapStateTopProps = (state) => {
    const { postList, isPostListLoading, isAllPostLoaded, errorPostLoading } = state.posts;
    return { postList, isPostListLoading, isAllPostLoaded, errorPostLoading };
}


const HomeScreenConnect = connect(mapStateTopProps, {
    updateDemoState,
    updatePostList
})(HomeScreen)


export default withCollapsible(HomeScreenConnect, { iOSCollapsedColor: '#031' });
