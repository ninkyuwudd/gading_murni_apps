import {useFocusEffect, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, ViewStyle} from 'react-native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import i18n from '../../../../i18n/i18n.config';
import {
  TBookingStatus,
  getBookingStatus,
} from '../../../customers/booking/constants/BookingStatus';
import {useAdminServices} from '../../../../api/hooks/useAdminServices';
import {BookingItem, EmptyCard} from '.';

interface IProps {
  containerStyle?: ViewStyle;
}

const BookingCard: React.FC<IProps> = ({containerStyle}) => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const {data, isLoading, refetch} = useAdminServices({size: 5});

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

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

  const loading = () =>
    !data ||
    (isLoading && (
      <ActivityIndicator
        size="small"
        color={theme.colors.primary}
        style={styles.indicator}
      />
    ));

  const bookingItem = () => {
    if (!data || !data.pages.length) {
      return null;
    }

    return data.pages.map((item, index) => (
      <BookingItem
        key={index}
        data={item}
        segment={bookingStatus}
        isDifferentStack
      />
    ));
  };

  const empty = () => data && !data.pages.length && <EmptyCard />;

  return (
    <View style={[styles.container, containerStyle]}>
      {loading()}
      {bookingItem()}
      {empty()}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
    },
    action: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.primary,
    },
    indicator: {
      alignSelf: 'center',
      marginVertical: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default BookingCard;
