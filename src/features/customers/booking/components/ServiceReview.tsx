import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {NavigationState, useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {BookingDetailResponse} from '../../../../@types/booking';
import {useTranslation} from 'react-i18next';
import {Button} from '../../../../components';
import {DefaultStyleSheet} from '../../../../constants/DefaultStyleSheet';
import {navigationRef} from '../../../../navigations/navigationService';

interface IProps {
  containerStyle?: ViewStyle;
  data: BookingDetailResponse;
}

const ServiceReview: React.FC<IProps> = ({containerStyle, data}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const defaultStyle = DefaultStyleSheet(theme);
  const styles = createStyles(theme);

  const goToReviewService = () => {
    const currentState = navigationRef.getState() as NavigationState;
    navigationRef.navigate('CustomerHome', {
      state: {
        routes: [
          {
            name: 'ServiceTab',
            state: {
              routes: [
                {
                  name: 'Service',
                },
                {
                  name: 'ServiceReview',
                  params: {
                    serviceId: data.data_body.service.id,
                    resetState: currentState,
                  },
                },
              ],
            },
          },
        ],
      },
    });
  };

  return (
    <View style={[styles.container, defaultStyle.shadow, containerStyle]}>
      <Button
        title={t('ServiceModule.Review.Header')}
        onPress={goToReviewService}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 20,
      marginTop: 20,
    },
  });

export default ServiceReview;
