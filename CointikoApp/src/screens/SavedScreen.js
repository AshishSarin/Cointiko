import React, { Component } from "react";
import { ScreenTitles } from "../values";
import { PostList } from "../components/layouts";
import { View } from 'react-native';
import { withCollapsible } from 'react-navigation-collapsible';
import { connect } from 'react-redux';




class SavedScreen extends Component {


    static navigationOptions = {
        title: ScreenTitles.TITLE_SAVED_POST
    };

    render() {

        const { paddingHeight, scrollY, onScroll } = this.props.collapsible;

        return (
            <View style={{ flex: 1 }}>
                {/* <CointikoStatusBar /> */}
                <PostList
                    navigate={this.props.navigation.navigate}
                    isSavedList={true}
                    paddingHeight={paddingHeight}
                    scrollY={scrollY}
                    onScroll={onScroll}
                />
            </View>
        );

    }

}

const mapStateTopProps = state => {
    return {};
}

const SavedScreenConnect = connect(mapStateTopProps, {
})(SavedScreen)


export default withCollapsible(SavedScreenConnect, { iOSCollapsedColor: '#031' });
