import React, { Component } from "react";
import {
    View, Text, FlatList,
    TouchableOpacity, Animated,
    Image, StyleSheet, RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { withCollapsible } from 'react-navigation-collapsible';
import { ScreenTitles } from "../values";
import { CoinItem, PostItemSeperator } from "../components/listItems";
import { updateCoinPrices, clearCoinPriceError } from '../actions'
import Toast, { DURATION } from 'react-native-easy-toast'


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MarketScreen extends Component {


    static navigationOptions = {
        title: ScreenTitles.TITLE_LIVE_PRICES_TAB
    };
    constructor(props) {
        super(props);

        this.props.updateCoinPrices();
    }

    renderCoinItem = ({ item, index }) => {
        return (
            <CoinItem coinData={item} />
        );
    }

    _onRefresh = () => {
        this.props.updateCoinPrices();
    }


    componentDidUpdate() {
        if (this.props.errorCoinPriceLoading) {
            this.refs.toast.show(this.props.errorCoinPriceLoading, 1000, () => {
                this.props.clearCoinPriceError();
            });
        }
    }

    render() {

        return (
            <View style={{
                flex: 1, justifyContent: 'center',
                alignContent: 'center', paddingTop: 0
            }}>
                {this.renderCoinPricesList()}
                <View
                    style={{
                        position: 'absolute', bottom: 0, backgroundColor: '#27343a',
                        paddingVertical: 4,
                        alignItems: 'center', justifyContent: 'center', width: "100%"
                    }}>
                    <Text style={{
                        fontSize: 12, color: 'white',
                    }}>
                        {'Copyright © 2018'}
                    </Text>
                </View>
                <Toast ref="toast" />
            </View>
        );
    }


    renderCoinPricesList() {

        const { paddingHeight, scrollY, onScroll } = this.props.collapsible;
        return (
            <AnimatedFlatList
                style={{ flex: 1 }}
                data={this.props.coinPriceList}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isCoinPricesLoading}
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
                ItemSeparatorComponent={() => <PostItemSeperator />}
            />
        )
    }
}

const mapStateTopProps = (state) => {
    const { errorCoinPriceLoading, isCoinPricesLoading, coinPriceList } = state.coin;
    return {
        errorCoinPriceLoading,
        isCoinPricesLoading,
        coinPriceList
    };
}


const MarketScreenConnect = connect(mapStateTopProps, {
    updateCoinPrices,
    clearCoinPriceError
})(MarketScreen)


export default withCollapsible(MarketScreenConnect, { iOSCollapsedColor: '#031' });
