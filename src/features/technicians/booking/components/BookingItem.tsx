/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../../constants/theme';
import {useTranslation} from 'react-i18next';
import {ServiceDetail} from '../../../../@types/service';
import {TBookingStatus} from '../../../customers/booking/constants/BookingStatus';
import {navigationRef} from '../../../../navigations/navigationService';
import {TechnicianBookingNavigationProp} from '../../../../@types/navigation';

type BookingItemProps = {
  data: ServiceDetail;
  segment: TBookingStatus[];
  isDifferentStack?: boolean;
};

const BookingItem: React.FC<BookingItemProps> = ({
  data: {
    booking_code,
    machine,
    status,
    technician,
    booking_datetime,
    id,
    customer,
    detail,
  },
  isDifferentStack,
  segment,
}: BookingItemProps) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const navigation = useNavigation<TechnicianBookingNavigationProp>();
  const currentSegment = segment.find(item => item.key === status);

  const onPressHandler = () => {
    if (isDifferentStack) {
      const rootState = navigationRef.getRootState();
      navigationRef.navigate('TechnicianHome', {
        state: {
          routes: [
            {
              name: 'BookingTab',
              state: {
                routes: [
                  {
                    name: 'Booking',
                  },
                  {
                    name: 'BookingDetail',
                    params: {
                      bookingId: id,
                      bookingCode: booking_code,
                      resetState: rootState,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    } else {
      navigation.navigate('BookingDetail', {
        bookingId: id,
        bookingCode: booking_code,
      });
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandler}
      style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={styles.deviceTypeContainer}>
            <Text style={styles.deviceTypeText}>
              <SvgXml
                xml={ICONS.icnPrinter(theme.colors.primary)}
                height={12}
                width={12}
              />{' '}
              {machine?.master_machine?.name}
            </Text>
          </View>
        </View>
        <Text style={styles.deviceName}>{customer?.name}</Text>
        <Text style={styles.bookingCode}>{`${t(
          'itemBoookingCodeLabel',
        )}: ${booking_code}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t(
            'registerFieldFields.companyName',
          )}:`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer?.company_name}
          </Text>
          <Text style={styles.label}>{`${t(
            'itemBoookingTechnicianNameLabel',
          )}:`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {technician?.name}
          </Text>
          <Text style={styles.label}>{`${t('itemServiceDateLabel')}:`}</Text>
          <Text style={styles.infoText}>{detail?.schedule_datetime}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t(
            'serviceScheduleFields.location',
          )}:`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {customer?.address_detail}
          </Text>
          <Text style={styles.label}>{`${t('itemBookingDateLabel')}:`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {booking_datetime}
          </Text>
          <Text style={styles.label}>{`${t('itemBoookingStatusLabel')}:`}</Text>
          {currentSegment && (
            <Text style={[styles.status, {color: currentSegment.color}]}>
              <SvgXml xml={currentSegment.icon} height={12} width={12} />{' '}
              {currentSegment?.title}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 20,
      borderRadius: SIZES.radiusSm,
    },
    header: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
    },
    deviceTypeContainer: {
      backgroundColor: 'rgba(18, 153, 218, 0.2)',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '100%',
    },
    deviceTypeText: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontXs,
      color: theme.colors.primary,
    },
    deviceName: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.primary,
      marginBottom: 5,
    },
    bookingCode: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.fontXs,
      color: theme.colors.placeHolder,
    },
    infoContainer: {
      flexDirection: 'row',
      padding: 10,
    },
    infoSection: {
      flex: 1,
    },
    label: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.fontXs,
      color: theme.colors.placeHolder,
    },
    status: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontXs,
    },
    spaceInfo: {
      marginBottom: 10,
    },
    infoText: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontXs,
      color: theme.colors.text,
    },
  });

export default BookingItem;
