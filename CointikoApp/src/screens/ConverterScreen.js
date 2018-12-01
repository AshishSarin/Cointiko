
import React, { Component } from "react";
import { View, ScrollView, Text, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';


const data = [{
    value: 'BTC',
}, {
    value: 'ETH',
}, {
    value: 'LTC',
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
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginHorizontal: 12, backgroundColor: 'white'
                }}>
                    <View style={{
                        width: "60%",
                        paddingHorizontal: 12,
                    }}>
                        <Text>I give</Text>
                        <View style={{
                            borderRadius: 6, marginTop: 8,
                            paddingHorizontal: 12,
                            height: 40, borderWidth: 1,
                            flexDirection: 'row', alignItems: 'center',
                        }}>

                            <Image
                                source={require('../images/icon_coin_bitcoin.png')}
                                style={{ height: 24, width: 24 }} />
                            <TextInput
                                placeholder={'Enter BTC'}
                                keyboardType="number-pad"
                                style={{
                                    flex: 1, height: 40, marginLeft: 8,
                                    width: "100%", fontSize: 16
                                }} />

                        </View>
                    </View>
                    <Dropdown
                        containerStyle={{
                            width: 85,
                            marginLeft: 20,
                            paddingBottom: 4,
                        }}
                        data={data}
                        value={"BTC"}

                    />
                </View>

                <View style={{
                    width: "100%", height: 60,
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Image
                        style={{ height: 32, width: 32 }}
                        source={require('../images/icon_convert.png')}
                    />
                </View>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginHorizontal: 12, backgroundColor: 'white'
                }}>
                    <View style={{
                        width: "60%",
                        paddingHorizontal: 12,
                    }}>
                        <Text>I give</Text>
                        <View style={{
                            borderRadius: 6, marginTop: 8,
                            paddingHorizontal: 12,
                            height: 40, borderWidth: 1,
                            flexDirection: 'row', alignItems: 'center',
                        }}>

                            <Image
                                source={require('../images/icon_coin_bitcoin.png')}
                                style={{ height: 24, width: 24 }} />
                            <TextInput
                                placeholder={'Enter BTC'}
                                style={{
                                    flex: 1, height: 40, marginLeft: 8,
                                    width: "100%", fontSize: 16
                                }} />

                        </View>
                    </View>
                    <Dropdown
                        containerStyle={{
                            width: 85,
                            marginLeft: 20,
                            paddingBottom: 4,
                        }}
                        data={data}
                        value={"BTC"}

                    />
                </View>

            </ScrollView>
        );
    }
}


export default connect(null, {})(ConverterScreen);