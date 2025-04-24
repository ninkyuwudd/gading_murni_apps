/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  useAdminProfileDetail,
  useAdminServices,
} from '../../../../api/hooks/useAdminServices';
import {config} from '../../../../constants/Configs';
import {SearchBar} from '../../../../components';
import i18n from '../../../../i18n/i18n.config';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {SegmentDataType, getSegmentData} from '../constants/SegmentData';
import {TechnicianBookingNavigationProp} from '../../../../@types/navigation';
import {BookingItem, SegmentedControl, EmptyCard} from '../components';
import {
  getBookingStatus,
  TBookingStatus,
} from '../../../customers/booking/constants/BookingStatus';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {ServiceStatus, ServiceStatusKey} from '../../../../@types/booking';

const Booking: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyle = DefaultStyleSheet(theme);
  const navigation = useNavigation<TechnicianBookingNavigationProp>();
  const [bookingCode, setBookingCode] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<string>('');
  const {data: dataAdminProfile, refetch: refetchAdminProfile} =
    useAdminProfileDetail();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useAdminServices({
    size: config.limitPage,
    booking_code: bookingCode,
    status: searchStatus.length ? searchStatus : undefined,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (data?.pages.length && !isLoading) {
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation, data?.pages.length, isLoading, refetch]);

  useFocusEffect(
    useCallback(() => {
      refetchService();
    }, []),
  );

  const refetchService = (): void => {
    refetch();
    refetchAdminProfile();
  };

  const [segmentData, setSegmentData] = useState<SegmentDataType[]>(
    getSegmentData(),
  );

  const [bookingStatus, setBookingStatus] = useState<TBookingStatus[]>(
    getBookingStatus(),
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setSegmentData(getSegmentData());
      setBookingStatus(getBookingStatus());
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const footerLoading = isFetchingNextPage ? (
    <ActivityIndicator
      size="small"
      color={theme.colors.primary}
      style={{alignSelf: 'center', marginVertical: 20}}
    />
  ) : null;

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={setBookingCode}
        placeholder={t('placeholderSearchBarBooking')}
      />
      <SegmentedControl
        segments={
          dataAdminProfile &&
          (dataAdminProfile.data_body.user.type === 'TECH' ||
            dataAdminProfile.data_body.user.type === 'HEAD_TECH')
            ? bookingStatus.filter(
                item =>
                  item.code !== ServiceStatusKey.Pending &&
                  item.code !== ServiceStatusKey.Accepted &&
                  item.code !== ServiceStatusKey.Canceled,
              )
            : bookingStatus
        }
        onChangeSegment={status => setSearchStatus(status)}
      />
      <FlatList
        data={data?.pages}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={defaultStyle.flatlistContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
          />
        }
        renderItem={({item}) => (
          <BookingItem data={item} segment={segmentData} />
        )}
        refreshing={isLoading}
        onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerLoading}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <EmptyCard />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Booking;
