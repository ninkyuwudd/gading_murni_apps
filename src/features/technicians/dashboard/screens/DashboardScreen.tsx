/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
} from 'react-native';
import {BookingCard} from '../../booking/components';
import {useAdminProfileDetail} from '../../../../api/hooks/useAdminServices';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../../constants/theme';
import {config} from '../../../../constants/Configs';
import {useTranslation} from 'react-i18next';

const Dashboard: React.FC = () => {
  const theme = useTheme() as unknown as Theme;
  const styles = createStyles(theme);
  const {data, refetch} = useAdminProfileDetail();
  const {t} = useTranslation();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              data?.data_body.user.profile?.image_path
                ? {
                    uri: `${config.baseURL}/storage/${data?.data_body.user.profile?.image_path}`,
                  }
                : IMAGES.userAvatar
            }
            resizeMode="cover"
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
            }}
          />
        </View>
        <View style={styles.informContainer}>
          <Text
            style={{
              color: theme.colors.placeHolder,
              fontSize: SIZES.font,
              fontFamily: FONTS_FAMILIES.medium,
              marginBottom: 3,
            }}>
            Hello
          </Text>
          <Text
            style={{
              color: theme.colors.headerText,
              fontSize: SIZES.font,
              fontFamily: FONTS_FAMILIES.semiBold,
              marginBottom: 5,
            }}>
            {data?.data_body.user.name}{' '}
            <Text
              style={{
                color: theme.colors.placeHolder,
                fontSize: SIZES.font,
                fontFamily: FONTS_FAMILIES.medium,
                marginBottom: 3,
              }}>
              ({data?.data_body.user.roles[0].name_alias})
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.label}>{`${t('BookingModule.Card.Title')}`}</Text>
      <ScrollView
        style={styles.containerList}
        showsVerticalScrollIndicator={false}>
        <BookingCard containerStyle={{marginBottom: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerList: {
      flexGrow: 1,
      paddingBottom: 100,
    },
    avatarContainer: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      backgroundColor: theme.colors.border,
    },
    informContainer: {
      paddingLeft: 16,
    },
    label: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.headerText,
      marginHorizontal: 20,
      marginBottom: 10,
    },
  });

export default Dashboard;
