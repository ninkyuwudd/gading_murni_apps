/* eslint-disable react-native/no-inline-styles */
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../../constants/theme';
import {useTranslation} from 'react-i18next';
import {ServiceData} from '../../../../@types/booking';
import {TBookingStatus} from '../constants/BookingStatus';
import {navigationRef} from '../../../../navigations/navigationService';
import {BookingNavigationProp} from '../../../../@types/navigation';

type IProps = {
  data: ServiceData;
  segment: TBookingStatus[];
  isDifferentStack?: boolean;
};

const BookingItem: React.FC<IProps> = ({data, segment, isDifferentStack}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const currentSegment = segment.find(item => item.key === data.status);
  const navigation = useNavigation<BookingNavigationProp>();

  const onPressHandle = () => {
    if (isDifferentStack) {
      const rootState = navigationRef.getRootState();
      navigationRef.navigate('CustomerHome', {
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
                      bookingId: data.id,
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
        bookingId: data.id,
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandle}
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
              {data?.machine?.master_machine?.code}
            </Text>
          </View>
        </View>
        <Text style={styles.deviceName}>
          {data.machine?.master_machine?.name}
        </Text>
        <Text style={styles.bookingCode}>{`${t(
          'BookingModule.Item.BookingCode',
        )}: ${data?.booking_code}`}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t(
            'BookingModule.Item.Status',
          )}:`}</Text>
          {currentSegment && (
            <Text
              style={[
                styles.status,
                styles.spaceInfo,
                {color: currentSegment.color},
              ]}>
              <SvgXml xml={currentSegment.icon} height={12} width={12} />{' '}
              {currentSegment?.title}
            </Text>
          )}
          <Text style={styles.label}>{`${t(
            'BookingModule.Item.Technician',
          )}:`}</Text>
          <Text style={styles.infoText}>{data.technician?.name}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>{`${t(
            'BookingModule.Item.BookingDate',
          )}:`}</Text>
          <Text style={[styles.infoText, styles.spaceInfo]}>
            {data?.booking_datetime}
          </Text>
          <Text style={styles.label}>{`${t(
            'BookingModule.Item.ServiceDate',
          )}:`}</Text>
          <Text style={styles.infoText}>{data?.detail?.schedule_datetime}</Text>
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
