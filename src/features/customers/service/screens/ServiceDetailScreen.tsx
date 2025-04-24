/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES} from '../../../../constants/theme';
import {ServiceDetailScreenProps} from '../../../../@types/navigation';
import {Button} from '../../../../components';
import {ServicesCost} from '../components';
import {useBookingDetail} from '../../../../api/hooks/useBooking';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ServiceDetail: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyleSheet = DefaultStyleSheet(theme);
  const styles = createStyles(theme);
  const defaultStyle = DefaultStyleSheet(theme);
  const navigation = useNavigation<ServiceDetailScreenProps['navigation']>();
  const route = useRoute<ServiceDetailScreenProps['route']>();
  const {serviceId} = route.params;
  const {data, refetch, isLoading} = useBookingDetail(serviceId!);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const giveRating = () => navigation.navigate('ServiceRating', {serviceId});

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          defaultStyleSheet.scrollScreenContainer,
          isLoading && defaultStyleSheet.scrollScreenCenterContent,
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
          <View style={defaultStyleSheet.paddingCardContainer}>
            <Text style={[defaultStyleSheet.textLabel1, styles.spaceBottom]}>
              {t('ServiceModule.ServiceDetail.Notes')}
            </Text>
            <Text style={defaultStyleSheet.textValue2}>
              {data?.data_body.service.detail.description}
            </Text>
            <ServicesCost
              data={data!.data_body.service.list}
              totalCost={data!.data_body.service.service_cost}
            />
            <Text style={[defaultStyleSheet.textLabel1, styles.spaceBottom]}>
              {t('ServiceModule.ServiceDetail.Feedback')}
            </Text>
            <Text style={defaultStyleSheet.textValue2}>
              {data?.data_body.service.detail.feedback}
            </Text>
          </View>
        )}
      </ScrollView>
      {data && (
        <View style={[styles.footer, defaultStyle.shadow]}>
          <BouncyCheckbox
            isChecked={isChecked}
            size={25}
            fillColor={theme.colors.primary}
            unfillColor={theme.colors.background}
            text={t('ServiceModule.ServiceDetail.PaymentConfirmation')}
            textStyle={styles.checkBoxText}
            style={{marginBottom: 15, marginRight: 15}}
            onPress={value => setIsChecked(value)}
          />
          <Button
            title={t('ServiceModule.ServiceDetail.ActionSubmit')}
            disabled={!isChecked}
            onPress={giveRating}
          />
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    spaceBottom: {
      marginBottom: 5,
    },
    footer: {
      backgroundColor: theme.colors.background,
      padding: 20,
      marginTop: 20,
    },
    checkBoxText: {
      fontFamily: FONTS_FAMILIES.regular,
      color: theme.colors.text,
      textDecorationLine: 'none',
    },
  });

export default ServiceDetail;
