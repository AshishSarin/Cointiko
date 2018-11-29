
import React, { Component } from "react";
import { View, ScrollView, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';


const data = [{
    value: 'Banana',
}, {
    value: 'Mango',
}, {
    value: 'Pear',
}];

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
                <Text>I give</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={{ borderRadius: 12, borderWidth: 1, flex: 1 }} />
                    <Dropdown
                        containerStyle={{ width: 150 }}
                        data={data}
                    />
                </View>
            </ScrollView>
        );
    }
}


export default connect(null, {})(ConverterScreen);