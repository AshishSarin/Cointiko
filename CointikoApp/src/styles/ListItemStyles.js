import { StyleSheet } from 'react-native';
import { LIST_BACKGROUND_COLOR } from '../values';

export const postItemStyle = StyleSheet.create({
    itemContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 0,
        backgroundColor: 'white',
    },

    itemTouchable: {
        flexDirection: 'row',
        height: 108,
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 16
    },
    itemThumbnail: {
        height: 76, width: 76, justifyContent: 'center', alignItems: 'center',
    },

    itemInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
        height: "100%",
        width: "100%",
    },

    itemTitle: {
        color: 'black',
        fontSize: 14,

    },

    itemExtra: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end'

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
        flex: 2,
        paddingLeft: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },

    coinPriceInfo: {
        flex: 4,
        paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
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
        color: 'black',
        paddingLeft: 24,
        width: 100,
    },

    priceChangeText: {
        fontSize: 14,
        color: 'green',
        paddingLeft: 0
    }
})
