import { StyleSheet } from 'react-native';
import { LIST_BACKGROUND_COLOR } from '../values';


export const initialPostLoaderStyle = StyleSheet.create({
    initialLoaderCointainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: LIST_BACKGROUND_COLOR
    }
})

export const postDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 12
    },

    postMetaData: {
        fontSize: 12,
        color: 'grey',
        marginTop: 8,
    },
    postImage: {
        marginTop: 14,
        width: "100%",
        height: 200
    },

    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }
})