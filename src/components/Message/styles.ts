import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 36,
    },
    message: {
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        color: COLORS.WHITE,
        lineHeight: 20,
        marginBottom: 12
    },
    userName: {
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        color: COLORS.WHITE,
        marginLeft: 16
    },
    footer: {
        width: '110%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});