
import React, { Component } from "react";
import { View, Text } from 'react-native';
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
            <View>
                <Text>Converter Screen</Text>
            </View>
        );
    }
}


export default connect(null, {})(ConverterScreen);