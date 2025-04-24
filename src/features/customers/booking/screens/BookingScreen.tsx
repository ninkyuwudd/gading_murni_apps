/* eslint-disable react/no-unstable-nested-components */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {FooterIndicator, SearchBar} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {BookingItem, SegmentedControl} from '../components';
import i18n from '../../../../i18n/i18n.config';
import {useBookings} from '../../../../api/hooks/useBooking';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {BookingNavigationProp} from '../../../../@types/navigation';
import {config} from '../../../../constants/Configs';
import {TBookingStatus, getBookingStatus} from '../constants/BookingStatus';
import {EmptyCard} from '../../service/components';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';

const Booking: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyle = DefaultStyleSheet(theme);
  const navigation = useNavigation<BookingNavigationProp>();
  const [searchStatus, setSearchStatus] = useState<string>('');
  const [bookingCode, setBookingCode] = useState<string>('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useBookings({
    size: config.limitPage,
    status: searchStatus.length ? searchStatus : undefined,
    booking_code: bookingCode ? bookingCode : undefined,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (data?.pages.length && !isLoading) {
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation, data?.pages.length, isLoading, refetch]);

  const [bookingStatus, setBookingStatus] = useState<TBookingStatus[]>(
    getBookingStatus(),
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setBookingStatus(getBookingStatus());
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);
  const footerLoading = isFetchingNextPage ? <FooterIndicator /> : null;

  return (
    <View style={defaultStyle.screenContainer}>
      <SearchBar
        placeholder={t('BookingModule.SearchBooking')}
        onChangeText={setBookingCode}
      />
      <SegmentedControl
        segments={bookingStatus}
        onChangeSegment={status => setSearchStatus(status)}
      />
      <FlatList
        data={data?.pages || []}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={defaultStyle.flatlistContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          data ? (
            <View style={styles.emptyContainer}>
              <EmptyCard />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
          />
        }
        renderItem={({item}) => (
          <BookingItem data={item} segment={bookingStatus} />
        )}
        refreshing={isLoading}
        onEndReached={() =>
          data?.pages.length && hasNextPage ? fetchNextPage() : null
        }
        onEndReachedThreshold={0.3}
        ListFooterComponent={footerLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Booking;
