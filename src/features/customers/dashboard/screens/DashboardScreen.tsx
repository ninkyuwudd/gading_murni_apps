/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useLayoutEffect} from 'react';
import {Image, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {IMAGES, SIZES} from '../../../../constants/theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {BannerCard} from '../components';
import {Theme} from '../../../../@types/theme';
import {ServiceCard} from '../../service/components';
import {MachineCard} from '../../machine/components';
import {DashboardNavigationProp} from '../../../../@types/navigation';
import {useSelector} from 'react-redux';
import {useCustomerDetail} from '../../../../api/hooks/useCustomer';
import {navigationRef} from '../../../../navigations/navigationService';
import {RootState} from '../../../../store/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Dashboard: React.FC = () => {
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const {data} = useCustomerDetail();
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation<DashboardNavigationProp>();
  const isVerifiedUser = useSelector(
    (state: RootState) => state.user.verifiedUser,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <Image
          source={IMAGES.logoGm}
          resizeMode={'contain'}
          style={styles.logoWhiteImage}
        />
      ),
      headerBackVisible: false,
      headerShadowVisible: false,
      headerTitle: () => null,
      headerBackground: () => (
        <Image
          style={{
            width: SIZES.width,
            backgroundColor: theme.colors.primary,
          }}
          source={IMAGES.vectorDashboard}
        />
      ),
      contentStyle: {
        backgroundColor: '#000000',
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (
      !isVerifiedUser &&
      data &&
      data.data_body.user.customer?.is_completed === 0
    ) {
      const rootState = navigationRef.getRootState();
      navigationRef.navigate('CustomerHome', {
        state: {
          routes: [
            {
              name: 'ProfileTab',
              state: {
                routes: [
                  {
                    name: 'Profile',
                  },
                  {
                    name: 'Location',
                    params: {
                      resetState: rootState,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <View
      style={[
        styles.screen,
        {paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom},
      ]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <BannerCard containerStyle={{marginTop: 8}} />
        <View style={styles.container}>
          <MachineCard containerStyle={{marginBottom: 20}} />
          <View style={styles.divider} />
          <ServiceCard containerStyle={{marginBottom: 40, marginTop: 20}} />
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    safeAreaView: {
      flex: 1,
    },
    vectorDashboard: {
      width: '100%',
      position: 'absolute',
    },
    logoWhiteImage: {
      width: 170,
      height: 75,
      marginLeft: 20,
      marginTop: 16,
    },
    redCircle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FF5D41',
      position: 'absolute',
      right: 4,
    },
    contentContainerStyle: {
      flexGrow: 1,
    },
    customIndicatorStyle: {
      height: 8,
      width: 8,
      top: 0,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    customIndicatorContainerStyle: {position: 'absolute', bottom: 0},
    container: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      marginTop: 20,
      // paddingHorizontal: 16,
      paddingVertical: 24,
    },
    divider: {
      width: SIZES.width - 40,
      height: 1,
      backgroundColor: theme.colors.border,
      alignSelf: 'center',
    },
  });

export default Dashboard;
