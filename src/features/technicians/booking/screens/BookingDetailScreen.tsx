/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {TechnicianBookingDetailScreenProps} from '../../../../@types/navigation';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  useScrollToTop,
} from '@react-navigation/native';
import {
  Stepper,
  CustomerData,
  ServiceData,
  AssignTechnicianModal,
  OnLocationModal,
  AfterService,
  AfterServiceData,
} from '../components';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {
  useAdminProfileDetail,
  useAdminServicesDetail,
} from '../../../../api/hooks/useAdminServices';
import {ServiceStatus} from '../../../../@types/booking';
import {Button} from '../../../../components';
import {useTranslation} from 'react-i18next';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {useAdminUserRoleDetail} from '../../../../api/hooks/useAdminUserServices';

const BookingDetail: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const roleId = useSelector((state: RootState) => state.user.roleId);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const actionOnLocationSheetRef = useRef<ActionSheetRef>(null);
  const navigation =
    useNavigation<TechnicianBookingDetailScreenProps['navigation']>();
  const route = useRoute<TechnicianBookingDetailScreenProps['route']>();
  const {bookingId} = route.params;
  const {data: roleDetailData, refetch: roleDetailRefetch} =
    useAdminUserRoleDetail(roleId!);
  const {data, refetch, isLoading} = useAdminServicesDetail(bookingId!);
  const [isScrolled, setIsScrolled] = useState(false);
  const {data: dataAdminProfile} = useAdminProfileDetail();

  const ref = useRef<ScrollView>(null);
  useScrollToTop(ref);

  const userType = dataAdminProfile?.data_body?.user?.type || '';
  const bookingStatus = data?.data_body?.service?.status || '';

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setIsScrolled(yOffset > 0);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: isScrolled,
    });
  }, [isScrolled, navigation]);

  useFocusEffect(
    useCallback(() => {
      refetchService();
    }, []),
  );

  const refetchService = (): void => {
    refetch();
    roleDetailRefetch();
  };

  const checkRole = (roleName: string): boolean => {
    const roles = roleDetailData?.data_body.role.access_menus || [];
    return roles.some(role => role.name === roleName);
  };

  const acceptBooking = () =>
    bookingStatus === ServiceStatus.Pending &&
    userType === 'ADMIN' && (
      <View style={{padding: 20}}>
        <Button
          title={t('acceptLabel')}
          onPress={() =>
            navigation.navigate('EditCustomerData', {bookingId: bookingId!})
          }
        />
      </View>
    );

  const updateBookingSchedule = () =>
    bookingStatus === ServiceStatus.Accepted &&
    userType === 'HEAD_TECH' && (
      <View style={{padding: 20}}>
        <Button
          title={t('changeScheduleLabel')}
          onPress={() =>
            navigation.navigate('EditCustomerData', {
              bookingId: bookingId!,
              disableEdit: true,
            })
          }
        />
      </View>
    );

  const assignTechnician = () =>
    ((bookingStatus === ServiceStatus.Accepted && userType === 'HEAD_TECH') ||
      (bookingStatus === ServiceStatus.OnGoing && userType === 'HEAD_TECH') ||
      (bookingStatus === ServiceStatus.OnGoingAlt &&
        userType === 'HEAD_TECH')) && (
      <View style={{padding: 20}}>
        <Button
          title={t('assignTechnicianLabel')}
          onPress={() => actionSheetRef.current?.show()}
        />
      </View>
    );

  const technicianOnLocation = () =>
    ((bookingStatus === ServiceStatus.OnGoing && userType === 'TECH') ||
      (bookingStatus === ServiceStatus.OnGoingAlt &&
        userType === 'HEAD_TECH')) && (
      <View style={{padding: 20}}>
        <Button
          title={t('technicianOnLocationLabel')}
          onPress={() => actionOnLocationSheetRef.current?.show()}
        />
      </View>
    );

  const afterService = () =>
    data?.data_body.service.status === ServiceStatus.OnProcess && (
      <>
        <View style={styles.divider} />
        <AfterService data={data!} refetch={refetchService} />
      </>
    );

  const afterServiceData = () =>
    (data?.data_body.service.status === ServiceStatus.WaitingApproval ||
      data?.data_body.service.status === ServiceStatus.Finish) && (
      <>
        <View style={styles.divider} />
        <AfterServiceData data={data!} />
      </>
    );

  return (
    <ScrollView
      ref={ref}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.screenContainer,
        isLoading && styles.centerContent,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetchService}
          colors={[theme.colors.primary]}
        />
      }>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <>
          {data?.data_body.service.status !== ServiceStatus.Rejected &&
            data?.data_body.service.status !== ServiceStatus.Canceled && (
              <Stepper
                steps={5}
                currentStatus={data?.data_body.service.status as number}
              />
            )}
          <CustomerData data={data!} />
          <View style={styles.divider} />
          <ServiceData data={data!} />
          {afterServiceData()}
          {acceptBooking()}
          {updateBookingSchedule()}
          {assignTechnician()}
          {technicianOnLocation()}
          {afterService()}
        </>
      )}
      {data && (
        <AssignTechnicianModal
          actionSheetRef={actionSheetRef}
          data={data}
          refetch={refetchService}
        />
      )}
      {data && (
        <OnLocationModal
          actionSheetRef={actionOnLocationSheetRef}
          data={data}
          refetch={refetchService}
        />
      )}
    </ScrollView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screenContainer: {
      flexGrow: 1,
    },
    centerContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: {
      height: 10,
      width: SIZES.width,
      backgroundColor: theme.colors.border,
    },
    btnEdit: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    btnEditlLabel: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      textAlign: 'center',
      color: theme.colors.primary,
    },
  });

export default BookingDetail;
