/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';
import {AdminServicesDetailResponse} from '../../../../@types/service';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';

type CustomerDataProps = {
  data: AdminServicesDetailResponse;
};

const CustomerData: React.FC<CustomerDataProps> = ({
  data: {
    data_body: {
      service: {booking_code, customer, detail},
    },
  },
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  const handlePress = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${customer.detail.geo_latitude},${customer.detail.geo_longitude}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('customerData')}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t('itemBoookingCodeLabel')}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {booking_code}
          </Text>
          <Text style={styles.label}>{`${t(
            'registerFieldFields.companyName',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.company_name}
          </Text>
          <Text style={styles.label}>{`${t(
            'registerFieldFields.phoneNumber',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.mobile_number}
          </Text>
          <Text style={styles.label}>{`${t(
            'dataCompletenessFieldFields.province',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.address_province}
          </Text>
          <Text style={styles.label}>{`${t(
            'dataCompletenessFieldFields.district',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.address_district}
          </Text>
          <Text style={styles.label}>{`${t(
            'dataCompletenessFieldFields.postalCode',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.address_postal_code}
          </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t(
            'registerFieldFields.fullName',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.name}
          </Text>
          <Text style={styles.label}>{`${t(
            'registerFieldFields.email',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.email}
          </Text>
          <Text style={styles.label}>{`${t(
            'dataCompletenessFieldFields.branch',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.branches[0].name}
          </Text>
          <Text style={styles.label}>{`${t(
            'dataCompletenessFieldFields.regency',
          )}`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer.address_city}
          </Text>
          <Text style={styles.label}>{`${t(
            'dataCompletenessFieldFields.village',
          )}`}</Text>
          <Text style={styles.infoText}>{customer.address_village}</Text>
        </View>
      </View>
      <Text style={styles.label}>{`${t(
        'dataCompletenessFieldFields.fullAddress',
      )}`}</Text>
      <Text style={[styles.infoText, styles.spaceInfo]}>
        {customer.address_detail}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <SvgXml
          xml={ICONS.icnLocation(theme.colors.primary)}
          width={24}
          height={24}
        />
        <Text
          style={{
            color: theme.colors.primary,
            fontFamily: FONTS_FAMILIES.bold,
            fontSize: SIZES.font,
            marginLeft: 10,
          }}>
          {t('headerDataCompletenessLabel')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    header: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
      marginBottom: 20,
    },
    spaceInfo: {
      marginBottom: 10,
    },
    infoContainer: {
      flexDirection: 'row',
    },
    infoSection: {
      flex: 1,
    },
    label: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.placeHolder,
      marginBottom: 5,
    },
    infoText: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.text,
    },
    location: {
      color: theme.colors.primary,
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      marginLeft: 10,
    },
  });

export default CustomerData;
