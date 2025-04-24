import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {useBookings} from '../../../../api/hooks/useBooking';
import {BookingItem} from '../../booking/components';
import {
  TBookingStatus,
  getBookingStatus,
} from '../../booking/constants/BookingStatus';
import i18n from '../../../../i18n/i18n.config';
import {ServiceCardNavigationProp} from '../../../../@types/navigation';
import {EmptyCard} from '.';

interface IProps {
  containerStyle?: ViewStyle;
}

const ServiceCard: React.FC<IProps> = ({containerStyle}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const navigation = useNavigation<ServiceCardNavigationProp>();
  const {data, isLoading, refetch} = useBookings({
    size: 5,
  });

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

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{t('ServiceModule.Card.Title')}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('BookingTab')}>
          <Text style={styles.action}>{t('ServiceModule.Card.Action')}</Text>
        </TouchableOpacity>
      </View>
      {!data || isLoading ? (
        <ActivityIndicator
          size="small"
          color={theme.colors.primary}
          style={styles.indicator}
        />
      ) : (
        <>
          {data.pages.map((item, index) => (
            <BookingItem
              key={index}
              data={item}
              segment={bookingStatus}
              isDifferentStack
            />
          ))}
        </>
      )}
      {data && data?.pages.length === 0 && <EmptyCard />}
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
  });

export default ServiceCard;
