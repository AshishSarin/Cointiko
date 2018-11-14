import React, { Component } from "react";
import {
    View, Text, FlatList,
    TouchableOpacity, Animated,
    Image, StyleSheet, RefreshControl
} from 'react-native';

import { withCollapsible } from 'react-navigation-collapsible';
import { ScreenTitles } from "../values";
import { PostListFooter, CoinItem } from "../components/listItems";
import { CryptoCoinIds } from "../utils";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MarketScreen extends Component {


    static navigationOptions = {
        title: ScreenTitles.TITLE_LIVE_PRICES_TAB
    };
    constructor(props) {
        super(props);

        const data = [
            { id: CryptoCoinIds.BITCOIN, coinName: "Bitcoin", coinPrice: "$199.56" },
            { id: CryptoCoinIds.ETHEREUM, coinName: "Ethereum", coinPrice: "$0.4645" },
            { id: CryptoCoinIds.BITCOIN_CASH, coinName: "Bitcoin Cash", coinPrice: "$1148.89" },
            { id: CryptoCoinIds.XRP, coinName: "XRP", coinPrice: "$562.98" },
            { id: CryptoCoinIds.LITECOIN, coinName: "Litecoin", coinPrice: "$9879.55" },
            { id: CryptoCoinIds.CARDANO, coinName: "Cardano", coinPrice: "$65.56" },
            { id: CryptoCoinIds.IOTA, coinName: "IOTA", coinPrice: "$ 12.23" },
            { id: CryptoCoinIds.BITCOIN, coinName: "Bitcoin", coinPrice: "$199.56" },
            { id: CryptoCoinIds.ETHEREUM, coinName: "Ethereum", coinPrice: "$0.4645" },
            { id: CryptoCoinIds.BITCOIN_CASH, coinName: "Bitcoin Cash", coinPrice: "$1148.89" },
            { id: CryptoCoinIds.XRP, coinName: "XRP", coinPrice: "$562.98" },
            { id: CryptoCoinIds.LITECOIN, coinName: "Litecoin", coinPrice: "$9879.55" },
            { id: CryptoCoinIds.CARDANO, coinName: "Cardano", coinPrice: "$65.56" },
            { id: CryptoCoinIds.IOTA, coinName: "IOTA", coinPrice: "$ 12.23" }
        ];

        1
        this.state = {
            data: data,
            refreshing: false,
        }
    }

    renderCoinItem = ({ item, index }) => {
        return (
            <CoinItem coinData={item} />
        );
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 3000);
    }



    render() {

        return (
            <View style={{
                flex: 1, justifyContent: 'center',
                alignContent: 'center', paddingTop: 0
            }}>
                {this.renderCoinPricesList()}
            </View>
        );
    }


    renderCoinPricesList() {

        const { paddingHeight, scrollY, onScroll } = this.props.collapsible;
        return (
            <AnimatedFlatList
                style={{ flex: 1 }}
                data={this.state.data}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        progressViewOffset={80}
                    />
                }
                renderItem={this.renderCoinItem}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{ paddingTop: paddingHeight }}
                scrollIndicatorInsets={{ top: paddingHeight }}
                _mustAddThis={scrollY}
                onScroll={onScroll}
                ItemSeparatorComponent={() => <PostListFooter />}
            />
        )
    }
}



export default withCollapsible(MarketScreen, { iOSCollapsedColor: '#031' });
