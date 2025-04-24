import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  Image,
} from 'react-native';
import {Theme} from '../../../../@types/theme';
import {
  FONTS_FAMILIES,
  ICONS,
  IMAGES,
  SIZES,
} from '../../../../constants/theme';
import {ServiceCardNavigationProp} from '../../../../@types/navigation';
import {SvgXml} from 'react-native-svg';
import {navigationRef} from '../../../../navigations/navigationService';

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
      <Text style={styles.text}>{t('MachineModule.Empty')}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.action}
        onPress={() =>
          navigationRef.navigate('Machine', {
            screen: 'AddMachine',
            params: {
              id: '',
              image_path: '',
              image_path_full: '',
              name: '',
              purchased_date: '',
              serial_number: '',
              type: '',
            },
          })
        }>
        <SvgXml xml={ICONS.icnPlus} width={14} height={14} />
        <Text style={styles.actionText}>
          {t('MachineModule.HeaderSubmitMachine')}
        </Text>
      </TouchableOpacity>
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
