import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {COLORS, FONTS_FAMILIES, ICONS} from '../../../constants/theme';
import {Theme} from '../../..//@types/theme';
import {useTranslation} from 'react-i18next';
import {
  VerificationMethodNavigationProp,
  VerificationMethodScreenProps,
} from '../../../@types/navigation';
import {useRoute, useTheme, useNavigation} from '@react-navigation/native';

const VerificationMethodScreen: React.FC = () => {
  const theme = useTheme() as Theme;
  const {t} = useTranslation();
  const navigation = useNavigation<VerificationMethodNavigationProp>();
  const route = useRoute<VerificationMethodScreenProps['route']>();
  const {data, toResetPassword} = route.params;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.iconBackgroundView}>
          <View style={styles.iconBackgroundTwoView}>
            <View
              style={[
                styles.iconView,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}>
              <SvgXml xml={ICONS.icnOtp} width={48} height={48} />
            </View>
          </View>
        </View>
        <Text style={styles.chooseVerificationMethod}>
          {t('chooseVerificationMethod')}
        </Text>
        <Text style={styles.verificationMethodDesc}>
          {t('verificationMethodDesc')}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.verificationMethodComponent}
          onPress={() =>
            toResetPassword
              ? navigation.navigate('Otp', {
                  otpType: 'Email',
                  data: data,
                })
              : navigation.navigate('ForgetPassword', {otpType: 'Email'})
          }>
          <SvgXml xml={ICONS.icnInbox} width={32} height={32} />
          <View style={styles.titleView}>
            <Text style={styles.label}>{t('viaEmail')}</Text>
            <Text style={styles.desc}>{t('viaEmailDesc')}</Text>
          </View>
          <SvgXml
            xml={ICONS.icnArrowRight(COLORS.primary)}
            width={16}
            height={16}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.verificationMethodComponent}
          onPress={() =>
            toResetPassword
              ? navigation.navigate('Otp', {
                  otpType: 'Whatsapp',
                  data: data,
                })
              : navigation.navigate('ForgetPassword', {otpType: 'Whatsapp'})
          }>
          <SvgXml xml={ICONS.icnWhatsapp} width={32} height={32} />
          <View style={styles.titleView}>
            <Text style={styles.label}>{t('viaWhatsapp')}</Text>
            <Text style={styles.desc}>{t('viaWhatsappDesc')}</Text>
          </View>
          <SvgXml
            xml={ICONS.icnArrowRight(COLORS.primary)}
            width={16}
            height={16}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainerStyle: {
    alignItems: 'center',
    flexGrow: 1,
    padding: 16,
  },
  iconBackgroundView: {
    alignItems: 'center',
    backgroundColor: '#F7FBFF',
    borderRadius: 164 / 2,
    height: 164,
    justifyContent: 'center',
    marginVertical: 16,
    width: 164,
  },
  iconBackgroundTwoView: {
    alignItems: 'center',
    backgroundColor: '#E5F2FF',
    borderRadius: 134 / 2,
    height: 134,
    justifyContent: 'center',
    width: 134,
  },
  iconView: {
    alignItems: 'center',
    borderRadius: 104 / 2,
    height: 104,
    justifyContent: 'center',
    width: 104,
  },
  chooseVerificationMethod: {
    color: COLORS.text,
    fontFamily: FONTS_FAMILIES.bold,
    fontSize: 22,
  },
  verificationMethodDesc: {
    fontFamily: FONTS_FAMILIES.regular,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  verificationMethodComponent: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderColor: '#C8C8C8',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  titleView: {
    flex: 1,
    marginHorizontal: 16,
  },
  label: {
    color: COLORS.title,
    fontFamily: FONTS_FAMILIES.bold,
    fontSize: 14,
  },
  desc: {
    color: COLORS.title,
    fontFamily: FONTS_FAMILIES.regular,
    fontSize: 14,
    marginTop: 4,
  },
});

export default VerificationMethodScreen;
