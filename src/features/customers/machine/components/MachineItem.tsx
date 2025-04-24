/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  FONTS_FAMILIES,
  ICONS,
  IMAGES,
  SIZES,
} from '../../../../constants/theme';
import {Theme} from '../../../../@types/theme';
import {SvgXml} from 'react-native-svg';
import {Machine} from '../../../../@types/machine';
import {config} from '../../../../constants/Configs';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';

interface IProps {
  data: Machine;
  onPress?: (machine: Machine) => void;
  containerStyle?: ViewStyle;
}

const MachineItem: React.FC<IProps> = ({data, onPress, containerStyle}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const defaultStyles = DefaultStyleSheet(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (onPress) {
          onPress(data);
        }
      }}
      style={[styles.container, defaultStyles.shadow, containerStyle]}>
      <View style={styles.imageContainer}>
        <Image
          source={
            data?.master_machine?.photo_image_path_full
              ? {uri: data?.master_machine?.photo_image_path_full}
              : IMAGES.deafultPrinter
          }
          resizeMode="contain"
          style={{
            width: 73,
            height: 73,
          }}
        />
      </View>
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.textLabel}>{t('MachineModule.Item.Name')}</Text>
        <Text style={styles.textValue}>{data?.master_machine?.name}</Text>
        <Text style={styles.textLabel}>
          {t('MachineModule.Item.SerialNumber')}
        </Text>
        <Text style={styles.textValue}>
          <SvgXml
            xml={ICONS.icnScanBardoce(theme.colors.headerText)}
            height={12}
            width={12}
          />{' '}
          {data.serial_number}
        </Text>
        <View style={styles.footerContentContainer}>
          <View>
            <Text style={styles.textLabel}>
              {t('MachineModule.Item.PurchaseDate')}
            </Text>
            <Text style={styles.textValue}>
              <SvgXml
                xml={ICONS.icnCalendar(theme.colors.headerText)}
                height={12}
                width={12}
              />{' '}
              {data.purchased_date}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>
              <SvgXml
                xml={ICONS.icnPrinter(theme.colors.primary)}
                height={12}
                width={12}
              />{' '}
              {data.master_machine?.code}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 20,
      alignItems: 'flex-start',
      borderRadius: 8,
      marginVertical: 10,
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.border,
      padding: 5,
    },
    textLabel: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.fontXs,
      color: theme.colors.text,
    },
    textValue: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      marginBottom: 5,
      color: theme.colors.headerText,
    },
    footerContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    typeContainer: {
      backgroundColor: 'rgba(18, 153, 218, 0.2)',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    typeLabel: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontXs,
      color: theme.colors.primary,
    },
  });

export default MachineItem;
