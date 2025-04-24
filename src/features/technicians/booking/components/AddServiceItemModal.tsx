/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Button, FormInput} from '../../../../components';
import {
  AfterServiceFormValues,
  AfterServiceItem,
} from '../../../../@types/service';
import {Formik} from 'formik';
import i18n from '../../../../i18n/i18n.config';
import {ObjectSchema} from 'yup';
import {
  afterServiceItemDefaultValue,
  afterServiceItemValidationSchema,
} from '../constants/ValidationSchema';
import {recalculateServiceCost} from '../../../../utils/Helpers';
import {SegmentedServices} from './';

interface IAddServiceItemModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  data: AfterServiceFormValues['serviceItems'];
  onResult: (values: AfterServiceFormValues['serviceItems']) => void;
  onCancel: () => void;
  editServiceItemIndex?: number | null | undefined;
}

const AddServiceItemModal: React.FC<IAddServiceItemModalProps> = ({
  actionSheetRef,
  data,
  onResult,
  editServiceItemIndex,
  onCancel,
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [initialValues, setInitialValues] = useState<AfterServiceItem>(
    afterServiceItemDefaultValue,
  );

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<AfterServiceItem>
  >(afterServiceItemValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(afterServiceItemValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    if (editServiceItemIndex !== null) {
      setInitialValues({
        amount: data.list[Number(editServiceItemIndex)].amount,
        cost: data.list[Number(editServiceItemIndex)].cost,
        note: data.list[Number(editServiceItemIndex)].note,
        sparepartName: data.list[Number(editServiceItemIndex)].sparepartName,
        type: data.list[Number(editServiceItemIndex)].type,
      });
    }
  }, [editServiceItemIndex !== null]);

  const editItemAtIndex = (
    dataEdit: AfterServiceFormValues['serviceItems'],
    index: number,
    newItem: AfterServiceItem,
  ): AfterServiceFormValues['serviceItems'] => {
    if (index >= 0 && index < dataEdit.list.length) {
      dataEdit.list[index] = newItem;
    } else {
      console.error('Invalid index. No item was edited.');
      return data;
    }

    return recalculateServiceCost(data);
  };

  const onFieldSubmit = (values: AfterServiceItem) => {
    if (editServiceItemIndex !== null) {
      onResult(editItemAtIndex(data, editServiceItemIndex as number, values));
    } else {
      const newList: AfterServiceItem[] = [...data.list, values];
      const newTotalCost: number = newList.reduce(
        (total, item) => total + Number(item.amount) * Number(item.cost),
        0,
      );
      const newData: AfterServiceFormValues['serviceItems'] = {
        list: newList,
        serviceCost: String(newTotalCost),
      };
      onResult(newData);
    }

    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      onBeforeShow={() => setInitialValues(afterServiceItemDefaultValue)}
      containerStyle={{
        backgroundColor: theme.colors.background,
        ...styles.actionContainer,
      }}>
      <View style={styles.devider} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Text style={styles.title}>
          {t('afterServiceFieldFields.serviceCost')}
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={formValidationSchema}
          enableReinitialize={true}
          onSubmit={onFieldSubmit}>
          {({handleSubmit, values, setFieldValue}) => (
            <>
              <Text style={styles.labelFormSegmented}>{`*${t(
                'afterServiceFieldFields.type',
              )}`}</Text>
              <SegmentedServices
                values={['Service', 'Sparepart']}
                selectedValue={values.type}
                onChange={value => setFieldValue('type', value, false)}
              />
              <FormInput
                name="sparepartName"
                label={`*${t('afterServiceFieldFields.sparepartName')}`}
                placeholder={t(
                  'afterServiceFieldFields.sparepartNamePlaceHolder',
                )}
                forceUppercase
              />
              <FormInput
                name="cost"
                formatSeparator
                keyboardType="number-pad"
                label={`*${t('afterServiceFieldFields.cost')}`}
                placeholder={t('afterServiceFieldFields.costPlaceHolder')}
              />
              <FormInput
                name="amount"
                keyboardType="number-pad"
                label={`*${t('afterServiceFieldFields.amount')}`}
                placeholder={t('afterServiceFieldFields.amountPlaceHolder')}
              />
              <Button
                title={t('saveLabel')}
                onPress={() => handleSubmit()}
                style={{marginTop: 40}}
              />
            </>
          )}
        </Formik>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            actionSheetRef.current?.hide();
            onCancel();
          }}
          style={styles.btnCancel}>
          <Text style={styles.btnCancelLabel}>{t('cancelLabel')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </ActionSheet>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    actionContainer: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 20,
    },
    devider: {
      width: 114,
      height: 8,
      alignSelf: 'center',
      borderRadius: 8 / 2,
      marginBottom: 20,
      backgroundColor: theme.colors.border,
    },
    title: {
      fontFamily: FONTS_FAMILIES.semiBold,
      color: theme.colors.headerText,
      fontSize: SIZES.fontLg,
      textAlign: 'center',
      marginBottom: 20,
    },
    infoContainer: {
      flexDirection: 'row',
    },
    infoSection: {
      flex: 1,
    },
    label: {
      fontFamily: FONTS_FAMILIES.regular,
      fontSize: SIZES.font,
      color: theme.colors.placeHolder,
      marginBottom: 5,
    },
    infoText: {
      fontFamily: FONTS_FAMILIES.semiBold,
      fontSize: SIZES.font,
      color: theme.colors.text,
    },
    btnCancel: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 20,
    },
    btnCancelLabel: {
      fontFamily: FONTS_FAMILIES.bold,
      fontSize: SIZES.font,
      textAlign: 'center',
      color: theme.colors.placeHolder,
    },
    labelFormSegmented: {
      fontSize: SIZES.font,
      fontFamily: FONTS_FAMILIES.medium,
      marginBottom: 8,
      color: theme.colors.text,
    },
  });

export default AddServiceItemModal;
