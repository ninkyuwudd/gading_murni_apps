/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../../../../components';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../../@types/theme';
import {useTranslation} from 'react-i18next';
import {navigationRef} from '../../../../navigations/navigationService';

const CallToAction: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {t('MachineModule.CallToAction.Title')}
        </Text>
        <Text style={styles.description}>
          {t('MachineModule.CallToAction.Description')}
        </Text>
      </View>
      <Button
        title={t('MachineModule.CallToAction.Add')}
        onPress={() =>
          navigationRef.navigate('Machine', {
            screen: 'AddMachine',
            params: {},
          })
        }
        style={{height: 35}}
        textStyle={{fontSize: SIZES.fontXs}}
        outline
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoContainer: {
      flex: 1,
      marginRight: 10,
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.h5,
      color: theme.colors.headerText,
    },
    description: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.fontXs,
      color: theme.colors.text,
    },
  });

export default CallToAction;
