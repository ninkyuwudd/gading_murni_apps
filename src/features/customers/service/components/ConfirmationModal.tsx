/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import {Button} from '../../../../components';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

interface IConfirmationModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  onConfirm: () => void;
  loading: boolean;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  actionSheetRef,
  onConfirm,
  loading,
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.actionContainer}>
      <View style={styles.devider} />
      <Text style={styles.title}>
        {t('ServiceModule.ConfirmationSubmit.Title')}
      </Text>
      <Text style={styles.desc}>
        {t('ServiceModule.ConfirmationSubmit.Desc')}
      </Text>
      <Button
        title={t('ServiceModule.ConfirmationSubmit.ActionSubmit')}
        onPress={onConfirm}
        disabled={loading}
        loading={loading}
        style={{marginTop: 40}}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={loading}
        onPress={() => actionSheetRef.current?.hide()}
        style={styles.btnCancel}>
        <Text style={styles.btnCancelLabel}>{t('Actions.Cancel')}</Text>
      </TouchableOpacity>
    </ActionSheet>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    actionContainer: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    devider: {
      width: 114,
      height: 8,
      alignSelf: 'center',
      borderRadius: 8 / 2,
      backgroundColor: theme.colors.border,
    },
    title: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.h4,
      marginTop: 40,
      textAlign: 'center',
      color: theme.colors.headerText,
    },
    desc: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      textAlign: 'center',
      marginTop: 10,
      color: theme.colors.text,
    },
    btnCancel: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
    },
    btnCancelLabel: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      textAlign: 'center',
      color: theme.colors.placeHolder,
    },
  });

export default ConfirmationModal;
