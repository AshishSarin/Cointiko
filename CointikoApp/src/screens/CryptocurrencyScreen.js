import React, { Component } from "react";
import { View } from 'react-native';
import {
    ScreenTitles, COINTIKO_HEADER_TINT_COLOR,
    COINTIKO_HEADER_COLOR
} from "../values";
import { PostCategoriesCodes } from "../utils";
import { PostList } from "../components/layouts";
import { DrawerButton } from "../components/buttons";
import { CointikoStatusBar } from "../components/widgets";




class CryptocurrencyScreen extends Component {
    static navigationOptions = ({ navigation }) => (
        {
            title: ScreenTitles.TITLE_CRYPTOCURRENCY_SCREEN,
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
                    categoryCode={PostCategoriesCodes.CRYPTOCURRENCY}
                />
            </View>
        );

    }

}

export default CryptocurrencyScreen;
