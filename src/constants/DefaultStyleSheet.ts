import {StyleSheet} from 'react-native';
import {Theme} from '../@types/theme';
import {FONTS_FAMILIES, SIZES} from './theme';

export const DefaultStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
    },
    flatlistContainer: {
      paddingHorizontal: 20,
      paddingBottom: 100,
      flexGrow: 1,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 4,
    },
    textLabel1: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
    },
    textValue2: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.text,
    },
    paddingCardContainer: {
      padding: 20,
    },
    scrollScreenContainer: {
      flexGrow: 1,
    },
    scrollScreenCenterContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    serviceItemsContainer: {
      backgroundColor: theme.colors.border,
      borderRadius: SIZES.radiusXs,
      padding: 10,
      marginBottom: 10,
    },
  });
