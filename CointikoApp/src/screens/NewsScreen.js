import React, { Component } from "react";
import { ScreenTitles, COINTIKO_HEADER_TINT_COLOR, COINTIKO_HEADER_COLOR } from "../values";
import { PostCategoriesCodes } from "../utils";
import { PostList } from "../components/layouts";
import { DrawerButton } from "../components/buttons";
import { View } from 'react-native';
import { CointikoStatusBar } from "../components/widgets";




class NewsScreen extends Component {
    static navigationOptions = ({ navigation }) => (
        {
            title: ScreenTitles.TITLE_NEWS_SCREEN,
            headerStyle: { backgroundColor: COINTIKO_HEADER_COLOR },
            headerTintColor: COINTIKO_HEADER_TINT_COLOR,
            headerLeft: (
                <DrawerButton onPressButton={() => navigation.openDrawer()} />
            )
        }
    );
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CointikoStatusBar />
                <PostList
                    navigate={this.props.navigation.navigate}
                    categoryCode={PostCategoriesCodes.NEWS}
                />
            </View>
        );

    }

}

export default NewsScreen;
