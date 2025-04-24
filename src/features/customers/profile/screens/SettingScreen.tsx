import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ThemeSwitch from '../../../../components/ThemeSwitch';
import {SvgXml} from 'react-native-svg';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../../constants/theme';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import LanguageSwitch from '../../../../components/LanguageSwitch';
import {useTranslation} from 'react-i18next';

const SettingsScreen: React.FC = () => {
  const theme = useTheme() as Theme;
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.primary,
          },
        ]}>
        <SvgXml
          xml={ICONS.icnLanguage(theme.colors.primary)}
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
          {t('settingChangeLanguageLabel')}
        </Text>
        <LanguageSwitch />
      </View>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.primary,
          },
        ]}>
        <SvgXml
          xml={ICONS.icnLightMode(theme.colors.primary)}
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
          Mode
        </Text>
        <ThemeSwitch />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
