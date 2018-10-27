import React, { Component } from 'react';
import { View, Image, StyleSheet, ImageBackground, Text } from 'react-native';
import CardView from 'react-native-cardview';

export default class FeaturedPostItem extends Component {
    render() {
        return (
            // <View style={{ marginHorizontal: 0, paddingVertical: 0 }}>
            <CardView style={[styles.contentContainer, { marginHorizontal: 12 }]}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={12}
            >
                <ImageBackground
                    resizeMode="stretch"
                    style={{ height: 200, width: "100%", flex: 1, justifyContent: 'flex-end' }}
                    source={{ uri: 'https://www.cointiko.com/wp-content/uploads/2018/10/cryptocurrencies-to-watch.jpg' }}
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }}>
                        <Text style={{ color: 'white', fontSize: 16, }}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                        >
                            Bitcoin startup Acinq raises $1.7 million to double down on lightning.
                                </Text>
                    </View>
                </ImageBackground>
            </CardView>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flexGrow: 1,
        height: 250,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    contentContainer: {
        padding: 1,
        borderColor: '#CCC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});