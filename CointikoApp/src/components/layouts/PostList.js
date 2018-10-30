import React, { Component } from 'react';
import { View, } from 'react-native';
import { updateBlockchainList } from '../../actions';

class PostList extends Component {

    // constructor

    render() {
        return (
            <View>

            </View>
        );
    }
}


const mapStateToProps = (state) => {
    const { }
}

export default connect(mapStateToProps, {
    updateBlockchainList
})(PostList)