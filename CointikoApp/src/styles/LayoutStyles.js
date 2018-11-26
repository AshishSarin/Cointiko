import { StyleSheet } from 'react-native';
import { LIST_BACKGROUND_COLOR } from '../values';




export const postListStyle = StyleSheet.create({
    postListContainer: {
        flex: 1,
        backgroundColor: LIST_BACKGROUND_COLOR,
        paddingTop: 16,
    },

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
        paddingTop: 12,
        paddingHorizontal: 24,
        marginTop: 0,
        backgroundColor: 'white'
    },

    postMetaData: {
        fontSize: 12,
        color: 'grey',
        marginTop: 8,
    },
    postImage: {
        marginTop: 14,
        width: "100%",
        height: 200,
        marginBottom: 14
    },

    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    }
})