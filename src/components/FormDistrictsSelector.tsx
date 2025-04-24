/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useField} from 'formik';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {Theme} from '../@types/theme';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useTranslation} from 'react-i18next';
import {useDistricts} from '../api/hooks/useCustomer';
import {District} from '../@types/location';
import {SearchBar} from '.';
import {config} from '../constants/Configs';

type FormDistrictInputProps = {
  name: string;
  label: string;
  regencyCode: string;
  editable?: boolean;
  onDistrictChange?: (district: District) => void;
};

const FormDistrictsSelector: React.FC<FormDistrictInputProps> = ({
  name,
  label,
  regencyCode,
  onDistrictChange,
  editable = true,
}) => {
  const [searchName, setSearchName] = useState<string>('');
  const {data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} =
    useDistricts({name: searchName, regencyCode, limit: config.limitPage});
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [field, meta, helpers] = useField<District>(name);
  const {value} = field;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const error = meta.error as unknown as District;

  const footerLoading = isFetchingNextPage ? (
    <ActivityIndicator
      size="small"
      color={theme.colors.primary}
      style={{alignSelf: 'center', marginVertical: 20}}
    />
  ) : null;

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
              color: String(value.district).length
                ? theme.colors.text
                : theme.colors.placeHolder,
            },
          ]}>
          {String(value.district).length
            ? String(value.district)
            : t('Actions.Select')}
        </Text>
        <SvgXml
          xml={ICONS.icnArrowDown(theme.colors.text)}
          width={16}
          height={16}
          style={styles.icon}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error.code}</Text>}
      <ActionSheet ref={actionSheetRef} containerStyle={styles.actionContainer}>
        <View style={styles.devider} />
        <Text style={styles.title}>
          {t('CustomerModule.Location.Form.Fields.District')}
        </Text>
        <SearchBar
          onChangeText={setSearchName}
          placeholder={t('CustomerModule.Location.Form.Fields.SearchDistrict')}
          containerStyle={{
            elevation: 0,
            shadowOpacity: 0,
          }}
        />
        <FlatList
          data={data?.pages || []}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                const selectedDistrict = {
                  code: item.code,
                  district: item.district,
                  regency: item.regency,
                };
                helpers.setValue(selectedDistrict, false);
                if (onDistrictChange) {
                  onDistrictChange(selectedDistrict);
                }
                actionSheetRef.current?.hide();
              }}
              style={styles.itemSelect}>
              <Text style={styles.itemText}>{item.district}</Text>
            </TouchableOpacity>
          )}
          refreshing={isLoading}
          onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
          onEndReachedThreshold={0.3}
          ListFooterComponent={footerLoading}
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
    itemText: {
      fontSize: SIZES.font,
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.medium,
    },
  });

export default FormDistrictsSelector;
