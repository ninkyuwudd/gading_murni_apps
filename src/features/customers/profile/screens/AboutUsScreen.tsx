/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {FONTS_FAMILIES, IMAGES, SIZES, ICONS} from '../../../../constants/theme';
import {SvgXml} from 'react-native-svg';

const AboutUs: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const openEmail = () => {
    const email = 'gm.online@gadingmurni.co.id';
    const subject = encodeURIComponent('Inquiry');
    const body = encodeURIComponent('Hello, I would like to ask...');
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const openWhatsApp = () => {
    const phoneNumber = '6282135681223';
    const message = encodeURIComponent('Hi, I would like to inquire about...');
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${message}`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.logoCompany}
        resizeMode="contain"
        style={{
          width: 164,
          height: 164,
        }}
      />
      <Text style={[styles.description, {color: theme.colors.text}]}>
        {t('aboutUsDescription')}
      </Text>
      <View style={styles.itemContainer}>
        <SvgXml
          xml={ICONS.icnLocation(theme.colors.primary)}
          width={24}
          height={24}
        />
        <Text
          style={[
            styles.itemTitle,
            {
              color: theme.colors.headerText,
              fontFamily: FONTS_FAMILIES.medium,
              fontSize: SIZES.font,
            },
          ]}>
          Jl. Tunjungan No.27 Surabaya, Surabaya, Jawa Timur
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openEmail}
        style={styles.itemContainer}>
        <SvgXml
          xml={ICONS.icnMail(theme.colors.primary)}
          width={24}
          height={24}
        />
        <Text
          style={[
            styles.itemTitle,
            {
              color: theme.colors.primary,
              fontFamily: FONTS_FAMILIES.medium,
              fontSize: SIZES.font,
            },
          ]}>
          gm.online@gadingmurni.co.id
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openWhatsApp}
        style={styles.itemContainer}>
        <SvgXml
          xml={ICONS.icnPhone(theme.colors.primary)}
          width={24}
          height={24}
        />
        <Text
          style={[
            styles.itemTitle,
            {
              color: theme.colors.primary,
              fontFamily: FONTS_FAMILIES.medium,
              fontSize: SIZES.font,
            },
          ]}>
          Head Office: 031-5353201 Ext 31 WA1: 082135681223
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  description: {
    fontFamily: FONTS_FAMILIES.regular,
    fontSize: SIZES.font,
    textAlign: 'center',
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  itemTitle: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default AboutUs;
