import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  Image,
} from 'react-native';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {useTranslation} from 'react-i18next';
import {useMachineDetail} from '../../../../api/hooks/useMachines';

interface IProps {
  machineId: string;
  containerStyle?: ViewStyle;
}

const InfoCard: React.FC<IProps> = ({machineId, containerStyle}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const {data} = useMachineDetail(machineId!);
  const imagePath =
    data &&
    data.data_body &&
    data.data_body.machine &&
    data.data_body.machine.master_machine &&
    data.data_body.machine.master_machine.photo_image_path_full
      ? {uri: data.data_body.machine.master_machine.photo_image_path_full}
      : IMAGES.deafultPrinter;

  return (
    <View
      style={[
        styles.container,
        !data && styles.loadingContainer,
        containerStyle,
      ]}>
      {!data ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <>
          <Image source={imagePath} resizeMode="contain" style={styles.image} />
          <Text style={styles.textTitle}>
            {data?.data_body.machine?.master_machine?.name}
          </Text>
          <View style={styles.infoLabelContainer}>
            <Text style={styles.textLabel}>{t('MachineModule.Item.Code')}</Text>
            <Text style={styles.textValue}>
              {data?.data_body.machine?.master_machine?.code}
            </Text>
          </View>
          <View style={styles.infoLabelContainer}>
            <Text style={styles.textLabel}>
              {t('MachineModule.Item.SerialNumber')}
            </Text>
            <Text style={styles.textValue}>
              {data?.data_body.machine.serial_number}
            </Text>
          </View>
          <View style={styles.infoLabelContainer}>
            <Text style={styles.textLabel}>
              {t('MachineModule.Item.PurchaseDate')}
            </Text>
            <Text style={styles.textValue}>
              {data?.data_body.machine.purchased_date}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 15,
      padding: 15,
      backgroundColor: theme.colors.border,
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 108,
      height: 108,
      alignSelf: 'center',
    },
    textTitle: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.h4,
      color: theme.colors.headerText,
      marginVertical: 20,
    },
    infoLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    textLabel: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.fontXs,
      color: theme.colors.text,
    },
    textValue: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.headerText,
    },
  });

export default InfoCard;
