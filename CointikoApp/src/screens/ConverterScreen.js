
import React, { Component } from "react";
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

class ConverterScreen extends Component {

    static navigationOptions = {
        title: 'Converter'
    }

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollView>
                <Text>Converter Screen</Text>
            </ScrollView>
        );
    }
}


export default connect(null, {})(ConverterScreen);