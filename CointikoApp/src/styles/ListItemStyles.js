import { StyleSheet } from 'react-native';
import { DRAWER_FOOTER_COLOR } from '../values';

export const postItemStyle = StyleSheet.create({
    itemContainer: {
        flex: 1,
        height: 120,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemThumbnail: {
        height: 80, width: 80, justifyContent: 'center', alignItems: 'center'
    },
    itemTitle: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
    }
});

export const drawerFooter = StyleSheet.create({
    footerContainer: {
        height: 1,
        backgroundColor: DRAWER_FOOTER_COLOR,
    }
})

