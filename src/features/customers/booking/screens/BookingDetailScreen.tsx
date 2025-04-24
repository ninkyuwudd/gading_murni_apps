import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {
  SegmentedDetail,
  BookingInformation,
  BookingStatus,
} from '../components';
import {BookingDetailScreenProps} from '../../../../@types/navigation';
import {useBookingDetail} from '../../../../api/hooks/useBooking';
import {InfoCard as InfoCardMachine} from '../../machine/components';

const BookingDetail: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles();
  const route = useRoute<BookingDetailScreenProps['route']>();
  const {bookingId} = route.params;
  const {data, refetch, isLoading} = useBookingDetail(bookingId!);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSegmentChange = (index: number) => {
    fadeOut();
    setTimeout(() => {
      setSelectedIndex(index);
      fadeIn();
    }, 300);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.screenContainer,
        isLoading && styles.centerContent,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={[theme.colors.primary]}
        />
      }>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <>
          <View style={styles.contentContainer}>
            <InfoCardMachine machineId={data!.data_body.service.machine_id} />
            <SegmentedDetail
              values={[
                t('BookingModule.Segment.Information'),
                t('BookingModule.Segment.Status'),
              ]}
              selectedIndex={selectedIndex}
              onChange={handleSegmentChange}
            />
          </View>
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}>
            {data && selectedIndex === 0 && (
              <BookingInformation data={data} refetch={refetch} />
            )}
            {data && selectedIndex === 1 && (
              <BookingStatus data={data?.data_body.service.status_logs} />
            )}
          </Animated.View>
        </>
      )}
    </ScrollView>
  );
};

const createStyles = () =>
  StyleSheet.create({
    screenContainer: {
      flexGrow: 1,
    },
    centerContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
  });

export default BookingDetail;
