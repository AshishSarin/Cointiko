import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated, Image, StyleSheet } from 'react-native';

import { withCollapsible } from 'react-navigation-collapsible';
import { ScreenTitles } from "../values";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MarketScreen extends Component {


    static navigationOptions = {
        title: ScreenTitles.TITLE_LIVE_PRICES_TAB
    };
    constructor(props) {
        super(props);

        const data = [];
        for (let i = 0; i < 4; i++) {
            data.push(i + 10);
        }

        this.state = {
            data: data
        }
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
            }}
            style={{ width: '100%', height: 50, borderBottomColor: '#0002', borderBottomWidth: 0.5, paddingHorizontal: 20, justifyContent: 'center' }}>
            <Text style={{ fontSize: 22 }}>{item}</Text>
        </TouchableOpacity>
    )


    render() {
        const { paddingHeight, scrollY, onScroll } = this.props.collapsible;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'black' }}>Live Prices</Text>
            </View>
            // <AnimatedFlatList
            //     style={{ flex: 1 }}
            //     data={this.state.data}
            //     renderItem={this.renderItem}
            //     keyExtractor={(item, index) => String(index)}
            //     contentContainerStyle={{ paddingTop: paddingHeight }}
            //     scrollIndicatorInsets={{ top: paddingHeight }}
            //     _mustAddThis={scrollY}
            //     onScroll={onScroll}
            // />
        );
    }
}



export default withCollapsible(MarketScreen, { iOSCollapsedColor: '#031' });
