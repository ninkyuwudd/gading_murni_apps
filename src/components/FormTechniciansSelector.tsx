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
import {SearchBar} from '.';
import {useAdminUserServices} from '../api/hooks/useAdminUserServices';
import {TechnicianFormValues} from '../@types/service';
import {config} from '../constants/Configs';

type FormTechniciansInputProps = {
  name: string;
  label: string;
  editable?: boolean;
  onTechnicianChange?: (technician: TechnicianFormValues['technician']) => void;
};

const FormTechniciansSelector: React.FC<FormTechniciansInputProps> = ({
  name,
  label,
  onTechnicianChange,
  editable = true,
}) => {
  const [searchName, setSearchName] = useState<string>('');
  const {data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} =
    useAdminUserServices({
      keyword: searchName,
      size: config.limitPage,
      type: 'TECH',
    });

  const theme = useTheme() as Theme;
  const [field, meta, helpers] =
    useField<TechnicianFormValues['technician']>(name);
  const {value} = field;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const error = meta.error as unknown as TechnicianFormValues['technician'];

  const footerLoading = isFetchingNextPage ? (
    <ActivityIndicator
      size="small"
      color={theme.colors.primary}
      style={{alignSelf: 'center', marginVertical: 20}}
    />
  ) : null;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.text,
          },
        ]}>
        {label}
      </Text>
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
          {String(value.name).length
            ? String(value.name)
            : t('technicianFieldFields.technicianPlaceHolder')}
        </Text>
        <SvgXml
          xml={ICONS.icnArrowDown(theme.colors.text)}
          width={16}
          height={16}
          style={styles.icon}
        />
      </TouchableOpacity>
      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.colors.errorText,
            },
          ]}>
          {error.name}
        </Text>
      )}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: theme.colors.background,
          ...styles.actionContainer,
        }}>
        <View
          style={[
            styles.devider,
            {
              backgroundColor: theme.colors.border,
            },
          ]}
        />
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.headerText,
              paddingHorizontal: 20,
            },
          ]}>
          {t('technicianFieldFields.technician')}
        </Text>
        <SearchBar
          onChangeText={setSearchName}
          placeholder={t('technicianFieldFields.searchTechnician')}
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
                helpers.setValue({
                  id: item.id,
                  name: item.name,
                  mobile_number: item.mobile_number,
                  branches: item.branches,
                });
                if (onTechnicianChange) {
                  onTechnicianChange({
                    id: item.id,
                    name: item.name,
                    mobile_number: item.mobile_number,
                    branches: item.branches,
                  });
                }
                actionSheetRef.current?.hide();
              }}
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
              }}>
              <Text
                style={{
                  fontSize: SIZES.font,
                  color: theme.colors.text,
                  fontFamily: FONTS_FAMILIES.medium,
                }}>
                {item.name}
              </Text>
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.font,
    fontFamily: FONTS_FAMILIES.medium,
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
  },
  actionContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    height: SIZES.height / 2,
  },
  devider: {
    width: 114,
    height: 8,
    alignSelf: 'center',
    borderRadius: 8 / 2,
  },
  title: {
    fontFamily: FONTS_FAMILIES.bold,
    fontSize: SIZES.h4,
    marginTop: 20,
  },
});

export default FormTechniciansSelector;
