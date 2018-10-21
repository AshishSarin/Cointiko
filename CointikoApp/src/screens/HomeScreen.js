import React, { Component } from "react";
import { View, Text, FlatList, ImageBackground, Animated, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withCollapsible } from 'react-navigation-collapsible';
import { updateDemoState } from '../actions/HomeActions';
import { ScreenTitles } from "../values";
import { updatePostList } from '../actions';
import { PostListItem, PostItemSeperator, PostListFooter } from "../components/listItems";

import Carousel from 'react-native-carousel-view';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class HomeScreen extends Component {

    static navigationOptions = {
        title: ScreenTitles.TITLE_NEWS_TAB,
    };
    constructor(props) {
        super(props);

        if (this.props.postList) {
            let offset = this.props.postList.length;
            this.props.updatePostList(offset);
        } else {
            this.props.updatePostList(0);
        }
    }

    renderItem = ({ item, index }) => {
        console.log(index);
        if (index === 0) {
            return this.renderCarousel();
        }
        return <PostListItem
            postItemData={item}
        />
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
                ListFooterComponent={() =>
                    <PostListFooter
                        isPostLoading={this.props.isPostListLoading}
                    />
                }
                onScroll={onScroll}
                onEndReachedThreshold={0.1}
                onEndReached={this.onLazyLoadPostList.bind(this)}
            />
        );
    }

    onLazyLoadPostList() {
        this.props.updatePostList(this.props.postList.length);
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
    const { postList, isPostListLoading, errorPostLoading } = state.posts;
    return { postList, isPostListLoading, errorPostLoading };
}


const HomeScreenConnect = connect(mapStateTopProps, {
    updateDemoState,
    updatePostList
})(HomeScreen)


export default withCollapsible(HomeScreenConnect, { iOSCollapsedColor: '#031' });
