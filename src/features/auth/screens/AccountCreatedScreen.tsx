/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../../../constants/theme';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../@types/theme';
import {Button} from '../../../components';
import {navigationRef} from '../../../navigations/navigationService';

const AccountCreated: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.accountCreated}
        resizeMode="contain"
        style={{
          height: 164,
        }}
      />
      <Text style={[styles.title, {color: theme.colors.headerText}]}>
        {t('headerAccountCreatedLabel')}
      </Text>
      <Text style={[styles.description, {color: theme.colors.text}]}>
        {t('descriptionAccountCreated')}
      </Text>
      <View style={styles.centerCard}>
        <Button
          title={t('btnLoginLabel')}
          onPress={() =>
            navigationRef.reset({
              index: 0,
              routes: [{name: 'CustomerHome'}],
            })
          }
          style={{marginTop: 20}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: FONTS_FAMILIES.bold,
    fontSize: SIZES.h4,
    marginTop: 20,
  },
  description: {
    fontFamily: FONTS_FAMILIES.regular,
    fontSize: SIZES.font,
    textAlign: 'center',
    marginTop: 10,
  },
  centerCard: {
    width: '100%',
    marginVertical: 20,
  },
});

export default AccountCreated;
