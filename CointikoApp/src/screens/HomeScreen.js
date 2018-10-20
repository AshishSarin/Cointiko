import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withCollapsible } from 'react-navigation-collapsible';
import { updateDemoState } from '../actions/HomeActions';
import { ScreenTitles } from "../values";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class HomeScreen extends Component {

    static navigationOptions = {
        title: ScreenTitles.TITLE_NEWS_TAB,
    };
    constructor(props) {
        super(props);

        const data = [];
        for (let i = 0; i < 60; i++) {
            data.push(i);
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
            <AnimatedFlatList
                style={{ flex: 1 }}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(index)}

                contentContainerStyle={{ paddingTop: paddingHeight }}
                scrollIndicatorInsets={{ top: paddingHeight }}
                _mustAddThis={scrollY}
                onScroll={onScroll}
            />
        );
    }
}


const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


const mapStateTopProps = (state) => {
    const { demo } = state.home;
    return { demo };
}


const HomeScreenConnect = connect(mapStateTopProps, {
    updateDemoState
})(HomeScreen)


export default withCollapsible(HomeScreenConnect, { iOSCollapsedColor: '#031' });
