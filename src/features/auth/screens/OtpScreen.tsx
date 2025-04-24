/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../constants/theme';
import {useRoute, useTheme} from '@react-navigation/native';
import {Theme} from '../../../@types/theme';
import {useTranslation} from 'react-i18next';
import {Button} from '../../../components';
import {OtpScreenProps} from '../../../@types/navigation';
import {useVerification, useVerify} from '../../../api/hooks/useAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {navigationRef} from '../../../navigations/navigationService';

const OTP_LENGTH = 4;

const Otp: React.FC = () => {
  const {
    mutate: mutateVerification,
    status: statusVerification,
    isSuccess,
  } = useVerification();
  const {mutate, status} = useVerify();
  const isLoading = status === 'pending' || statusVerification === 'pending';
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const route = useRoute<OtpScreenProps['route']>();
  const {data, otpType} = route.params;
  const [otpValue, setOtpValue] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(30);
  const disabledBtn = otpValue.length === OTP_LENGTH;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isSuccess && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isSuccess, countdown]);

  useEffect(() => {
    sendOtpHandle(otpType.toUpperCase());
  }, []);

  useEffect(() => {
    if (disabledBtn) {
      otpHandle();
    }
  }, [otpValue]);

  const otpHandle = (): void => {
    mutate(
      {otp_token: otpValue},
      {
        onSuccess: () => {
          navigationRef.reset({
            index: 0,
            routes: [{name: 'CustomerHome'}],
          });
        },
      },
    );
  };

  const sendOtpHandle = async (type: string): Promise<void> => {
    mutateVerification(
      {
        otp_type: type,
      },
      {
        onSuccess: () => {
          setCountdown(30);
        },
      },
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Image
          source={IMAGES.otpConfirm}
          resizeMode="contain"
          style={{
            width: 164,
            height: 164,
          }}
        />
        <Text style={[styles.title, {color: theme.colors.headerText}]}>
          {t('enterOtpCode')}
        </Text>
        <Text style={[styles.info, {color: theme.colors.text}]}>
          {t('otpInfo1')}
          {` ${otpType} `}
          <Text
            style={{
              color: theme.colors.primary,
              fontFamily: FONTS_FAMILIES.medium,
            }}>
            {otpType.toLowerCase() === 'email'
              ? data?.user.email
              : data?.user.mobile_number}
          </Text>
          {t('pleaseCheck')} {`${otpType}`} {t('otpInfo2')}
        </Text>
        <View style={styles.centerCard}>
          <OTPTextInput
            containerStyle={styles.otpContainer}
            inputCount={OTP_LENGTH}
            keyboardType="number-pad"
            handleTextChange={setOtpValue}
            autoFocus={true}
            tintColor={theme.colors.primary}
            offTintColor={theme.colors.border}
            textInputStyle={{
              height: 50,
              width: 60,
              borderRadius: SIZES.radius,
              borderColor: theme.colors.border,
              borderWidth: 1,
              borderBottomWidth: 1,
            }}
          />
          {countdown === 0 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => sendOtpHandle(otpType.toUpperCase())}>
              <Text style={[styles.info, {color: theme.colors.primary}]}>
                {t('resendOtpAction')}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.info, {color: theme.colors.text}]}>
              {t('resendOtp')} {countdown} {t('secondTimeLabel')}
            </Text>
          )}
          <Button
            title={t('nextLabel')}
            onPress={otpHandle}
            loading={isLoading}
            style={{
              marginTop: 20,
              width: '100%',
              ...(!disabledBtn
                ? {backgroundColor: theme.colors.placeHolder}
                : {}),
            }}
            disabled={!disabledBtn || isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  centerCard: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS_FAMILIES.bold,
    fontSize: SIZES.h4,
    marginVertical: 20,
  },
  info: {
    fontFamily: FONTS_FAMILIES.regular,
    fontSize: SIZES.font,
    textAlign: 'center',
  },
  otpContainer: {
    width: 300,
    height: 50,
    marginVertical: 40,
  },
});

export default Otp;
