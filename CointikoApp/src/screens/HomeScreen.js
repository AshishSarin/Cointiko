import React, { Component } from "react";
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { withCollapsible } from 'react-navigation-collapsible';
import { updateDemoState } from '../actions/HomeActions';
import { ScreenTitles } from "../values";
import { updatePostList } from '../actions';
import { PostList } from "../components/layouts";
import { PostCategoriesCodes } from "../utils";
import { CointikoStatusBar } from "../components/widgets";


class HomeScreen extends Component {

    static navigationOptions = {
        title: ScreenTitles.TITLE_UPDATES_TAB,
    };

    render() {

        const { paddingHeight, scrollY, onScroll } = this.props.collapsible;
        return (
            <View style={{ flex: 1, paddingTop: 0 }}>
                <CointikoStatusBar />
                <PostList
                    navigate={this.props.navigation.navigate}
                    categoryCode={PostCategoriesCodes.HOME}
                    paddingHeight={paddingHeight}
                    scrollY={scrollY}
                    onScroll={onScroll}
                />
            </View>
        );

    }

}

const mapStateTopProps = (state) => {
    const { postList, isPostListLoading, featuredPostList, isAllPostLoaded, errorPostLoading } = state.posts;

    return { postList, isPostListLoading, featuredPostList, isAllPostLoaded, errorPostLoading };
}


const HomeScreenConnect = connect(mapStateTopProps, {
    updateDemoState,
    updatePostList
})(HomeScreen)


export default withCollapsible(HomeScreenConnect, { iOSCollapsedColor: '#031' });
