import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Text, StyleSheet, View, ViewStyle, Image} from 'react-native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../../constants/theme';

interface IProps {
  containerStyle?: ViewStyle;
}

const EmptyCard: React.FC<IProps> = ({containerStyle}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={IMAGES.noData} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>{t('ServiceModule.Empty')}</Text>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    image: {
      width: 110,
    },
    text: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.placeHolder,
      width: 180,
      textAlign: 'center',
      marginVertical: 20,
    },
    action: {
      height: 40,
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
    },
    actionText: {
      color: '#FFFFFF',
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      marginLeft: 12,
    },
  });

export default EmptyCard;
