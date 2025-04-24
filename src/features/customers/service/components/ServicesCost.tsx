/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {ServiceCost} from '../../../../@types/booking';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {formatWithThousandSeparator} from '../../../../utils/Helpers';

interface IProps {
  data: ServiceCost[];
  totalCost: string;
}

const ServicesCost: React.FC<IProps> = ({data, totalCost}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyles = DefaultStyleSheet(theme);
  const styles = createStyles(theme);

  return (
    <View style={styles.cardContainer}>
      <Text style={[defaultStyles.textLabel1, {marginBottom: 10}]}>
        {t('addServiceItemHeaderLabel')}
      </Text>
      {data.map((service, index) => (
        <View key={index} style={styles.serviceItemsContainer}>
          <View style={styles.serviceRow}>
            <View style={styles.viewColumn1}>
              <Text style={styles.serviceLabel}>{index + 1}.</Text>
            </View>
            <View style={styles.viewColumn2}>
              <Text style={styles.serviceLabel}>{service.sparepart_name}</Text>
              <Text
                style={[
                  styles.serviceLabel,
                  {color: theme.colors.placeHolder},
                ]}>
                {service.type}
              </Text>
            </View>
            <View style={styles.viewColumn3}>
              <Text style={[styles.serviceValue, {textAlign: 'right'}]}>{`${
                service.amount
              }PCS X Rp ${formatWithThousandSeparator(service.cost)}`}</Text>
              <Text
                style={[
                  styles.serviceValue,
                  {
                    textAlign: 'right',
                    fontFamily: FONTS_FAMILIES.semiBold,
                  },
                ]}>{`= Rp ${formatWithThousandSeparator(
                Number(service.amount) * Number(service.cost),
              )}`}</Text>
            </View>
          </View>
        </View>
      ))}
      <View style={[styles.totalContainer, styles.spaceInfo]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text
          style={[styles.totalLabel, {fontFamily: FONTS_FAMILIES.semiBold}]}>
          Rp {formatWithThousandSeparator(totalCost)}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      marginVertical: 15,
    },
    serviceItemsContainer: {
      backgroundColor: theme.colors.border,
      borderRadius: SIZES.radiusXs,
      padding: 10,
      marginBottom: 10,
    },
    serviceRow: {
      flexDirection: 'row',
    },
    viewColumn1: {
      marginRight: 5,
    },
    viewColumn2: {
      flex: 0.6,
    },
    viewColumn3: {
      flex: 0.4,
    },
    serviceLabel: {
      color: theme.colors.headerText,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.semiBold,
    },
    serviceValue: {
      color: theme.colors.text,
      fontSize: SIZES.fontXs,
      fontFamily: FONTS_FAMILIES.regular,
    },
    totalContainer: {
      paddingLeft: 15,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: -10,
    },
    totalLabel: {
      color: theme.colors.headerText,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.regular,
    },
    spaceInfo: {
      marginTop: 10,
    },
  });

export default ServicesCost;
