import { StyleSheet } from 'react-native';
import { LIST_BACKGROUND_COLOR } from '../values';

export const postItemStyle = StyleSheet.create({
    itemContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: 'white',
    },

    itemTouchable: {
        flexDirection: 'row',
        height: 120,
        alignItems: 'center',
        paddingHorizontal: 12
    },
    itemThumbnail: {
        height: 80, width: 80, justifyContent: 'center', alignItems: 'center',
    },
    itemTitle: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: 'black'
    }
});

export const postListFooterStyle = {
    footerContainer: {
        height: 100,
        backgroundColor: LIST_BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    }
}


export const featuredPostItemStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        flex: 1,
    },
    cardContainer: {
        justifyContent: 'center',
        flex: 1
    },
    touchableContainer: {
        flex: 1
    },
    imageContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: 'flex-end'
    },
    itemContent: {
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    itemTitle: {
        color: 'white',
        fontSize: 16,
    }
})


export const coinItemStyle = StyleSheet.create({
    itemContainer: {
        width: "100%",
        height: 50,
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: 'white'

    },

    coinInfo: {
        flex: 4,
        paddingLeft: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },

    coinImage: {
        height: 20,
        width: 20
    },

    coinNameText: {
        fontSize: 14,
        marginLeft: 12,
        color: 'black',
    },

    priceText: {
        fontSize: 14,
        flex: 3,
        color: 'black',
        paddingLeft: 32
    }
})
