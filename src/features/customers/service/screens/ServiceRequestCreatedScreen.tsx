/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../../constants/theme';
import {useTranslation} from 'react-i18next';
import {useRoute, useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {Button} from '../../../../components';
import {ServiceRequestCreatedScreenProps} from '../../../../@types/navigation';
import {navigationRef} from '../../../../navigations/navigationService';

const ServiceRequestCreated: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const route = useRoute<ServiceRequestCreatedScreenProps['route']>();
  const {bookingId} = route.params;

  const goToDashboard = (isGoToDashboard: boolean) => {
    if (isGoToDashboard) {
      navigationRef.reset({
        index: 0,
        routes: [
          {
            name: 'CustomerHome',
            state: {
              routes: [
                {name: 'DashboardTab'},
                {
                  name: 'BookingTab',
                  state: {
                    routes: [
                      {name: 'Booking'},
                      {
                        name: 'BookingDetail',
                        params: {
                          bookingId,
                        },
                      },
                    ],
                    index: 1,
                  },
                },
              ],
              index: 1,
            },
          },
        ],
      });
    } else {
      navigationRef.reset({
        index: 0,
        routes: [{name: 'CustomerHome'}],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerCard}>
        <Image
          source={IMAGES.serviceCreated}
          resizeMode="contain"
          style={{
            height: 164,
          }}
        />
        <Text style={styles.title}>
          {t('ServiceModule.ServiceRequestCreated.Title')}
        </Text>
        <Text style={styles.description}>
          {t('ServiceModule.ServiceRequestCreated.Desc')}
        </Text>
      </View>
      <Button
        title={t('ServiceModule.ServiceRequestCreated.ActionToDetail')}
        onPress={() => goToDashboard(true)}
        style={{marginTop: 20}}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToDashboard(false)}
        style={styles.btnBack}>
        <Text style={styles.btnBackLabel}>
          {t('ServiceModule.ServiceRequestCreated.ActionToHome')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.h4,
      marginTop: 40,
      color: theme.colors.headerText,
    },
    description: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      textAlign: 'center',
      marginTop: 10,
      color: theme.colors.text,
    },
    centerCard: {
      alignItems: 'center',
      marginVertical: 20,
    },
    btnBack: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    btnBackLabel: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      textAlign: 'center',
      color: theme.colors.primary,
    },
  });

export default ServiceRequestCreated;
