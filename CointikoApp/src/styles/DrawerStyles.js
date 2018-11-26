import { StyleSheet } from 'react-native';
import {
    DRAWER_ITEM_TEXT_COLOLR,
    DRAWER_ITEM_COLOR,
    DRAWER_ITEM_SEPERATOR_COLOR
} from '../values';


export const drawerStyle = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: DRAWER_ITEM_COLOR
    },
    itemContainer: {
        flexDirection: 'row',
        height: 54,
        alignItems: 'center',
        paddingLeft: 16

    },
    itemText: {
        fontSize: 16,
        marginLeft: 12,
        color: DRAWER_ITEM_TEXT_COLOLR
    },
    itemImage: {
        height: 32,
        width: 32
    }
});

export const drawerFooter = StyleSheet.create({
    footerContainer: {
        height: 1,
        backgroundColor: DRAWER_ITEM_SEPERATOR_COLOR,
    }
})