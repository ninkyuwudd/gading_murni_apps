/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useField} from 'formik';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {Theme} from '../@types/theme';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useTranslation} from 'react-i18next';
import {useBranches} from '../api/hooks/useCustomer';
import {Branch} from '../@types/location';

type IProps = {
  name: string;
  label: string;
  cityId: string;
  editable?: boolean;
};

const FormBranchesSelector: React.FC<IProps> = ({
  name,
  label,
  cityId,
  editable = true,
}) => {
  const {data, isLoading} = useBranches({city_id: cityId});
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [field, meta, helpers] = useField<Branch>(name);
  const {value} = field;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const error = meta.error as unknown as Branch;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!editable}
        onPress={() => actionSheetRef.current?.show()}
        style={[
          styles.inputContainer,
          {
            borderColor: meta?.error
              ? theme.colors.errorText
              : theme.colors.border,
            backgroundColor: editable
              ? theme.colors.background
              : theme.colors.border,
          },
        ]}>
        <Text
          style={[
            styles.input,
            {
              color: String(value.name).length
                ? theme.colors.text
                : theme.colors.placeHolder,
            },
          ]}>
          {String(value.name).length ? String(value.name) : t('Actions.Select')}
        </Text>
        <SvgXml
          xml={ICONS.icnArrowDown(theme.colors.text)}
          width={16}
          height={16}
          style={styles.icon}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error.id}</Text>}
      <ActionSheet ref={actionSheetRef} containerStyle={styles.actionContainer}>
        <View style={styles.devider} />
        <Text style={styles.title}>
          {t('CustomerModule.Location.Form.Fields.NearestBranch')}
        </Text>
        <FlatList
          data={data?.data_body.branches || []}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                const selectedBranch = {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  is_active: item.is_active,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                };
                helpers.setValue(selectedBranch, false);
                actionSheetRef.current?.hide();
              }}
              style={styles.itemSelect}>
              <Text style={styles.branchName}>{item.name}</Text>
              <Text style={styles.branchLocation}>{item.description}</Text>
            </TouchableOpacity>
          )}
          refreshing={isLoading}
        />
      </ActionSheet>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      height: 40,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      justifyContent: 'center',
    },
    icon: {
      padding: 12,
    },
    errorText: {
      fontSize: 14,
      marginTop: 4,
      fontFamily: FONTS_FAMILIES.medium,
      color: theme.colors.errorText,
    },
    actionContainer: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingVertical: 20,
      height: SIZES.height / 2,
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
      marginTop: 20,
      color: theme.colors.headerText,
      paddingHorizontal: 20,
    },
    itemSelect: {
      padding: 20,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
    branchName: {
      fontSize: SIZES.font,
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.semiBold,
    },
    branchLocation: {
      fontSize: SIZES.font,
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.regular,
    },
  });

export default FormBranchesSelector;
