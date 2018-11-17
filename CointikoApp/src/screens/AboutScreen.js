
import React, { Component } from "react";
import {
    View, ScrollView, Text,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import aboutData from '../data/AboutUs.json';
import { ScreenTitles, COINTIKO_HEADER_COLOR, COINTIKO_HEADER_TINT_COLOR } from "../values";

class AboutScreen extends Component {


    static navigationOptions = ({ navigation }) => (
        {
            title: ScreenTitles.TITLE_ABOUT_SCREEN,
            headerStyle: { backgroundColor: COINTIKO_HEADER_COLOR },
            headerTintColor: COINTIKO_HEADER_TINT_COLOR,
        }
    );

    constructor(props) {
        super(props);
        console.log(aboutData)
    }
    render() {
        return (
            <ScrollView style={{ paddingHorizontal: 20, paddingBottom: 24, flex: 1 }}>
                <Image
                    resizeMode="contain"
                    style={{ height: 100, width: "100%", marginVertical: 12 }}
                    source={require('../images/logo_cointiko.png')} />
                {this.renderAboutData()}
            </ScrollView>
        );
    }

    renderAboutData() {
        return aboutData.map(item => {
            return (
                <Text style={{ marginBottom: 10, fontSize: 14, color: 'black' }}>
                    {item.data}
                </Text>
            );
        });
    }
}


export default connect(null, {})(AboutScreen);