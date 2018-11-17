import React, { Component } from "react";
import { View, Text, Image } from 'react-native';
import { CryptoCoinIds } from "../../utils";
import { coinItemStyle } from "../../styles";

export default class CoinItem extends Component {

    render() {

        const { coinData } = this.props;
        let coinImage = this.getCoinImage(coinData.id);
        let priceChangeColor = coinData.change >= 0 ? 'green' : 'red'
        return (
            <View
                style={coinItemStyle.itemContainer}
            >
                <View style={coinItemStyle.coinInfo}>
                    <Image
                        source={coinImage}
                        style={coinItemStyle.coinImage} />
                    <Text style={coinItemStyle.coinNameText}>
                        {coinData.coinName}
                    </Text>
                </View>
                <View style={coinItemStyle.coinPriceInfo}>
                    <Text style={coinItemStyle.priceText}>
                        {"$ " + Number((coinData.coinPrice).toFixed(4))}
                    </Text>
                    <Text style={[coinItemStyle.priceChangeText, { color: priceChangeColor }]}>
                        {"(" + Number((coinData.change).toFixed(2)) + " %)"}
                    </Text>
                </View>
            </View>
        );
    }


    getCoinImage(coinId) {
        switch (coinId) {
            case CryptoCoinIds.BITCOIN:
                return require('../../images/icon_coin_bitcoin.png')
            case CryptoCoinIds.ETHEREUM:
                return require('../../images/icon_coin_ethereum.png')
            case CryptoCoinIds.BITCOIN_CASH:
                return require('../../images/icon_coin_bitcoin_cash.png')
            case CryptoCoinIds.XRP:
                return require('../../images/icon_coin_xrp.png')
            case CryptoCoinIds.LITECOIN:
                return require('../../images/icon_coin_litecoin.png')
            case CryptoCoinIds.CARDANO:
                return require('../../images/icon_coin_cardano.png')
            case CryptoCoinIds.IOTA:
                return require('../../images/icon_coin_iota.png')
            default:
                return require('../../images/icon_coin_bitcoin.png')
        }
    }

}