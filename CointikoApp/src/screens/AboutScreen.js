
import React, { Component } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class AboutScreen extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>About Screen</Text>
            </View>
        );
    }
}


export default connect(null, {})(AboutScreen);