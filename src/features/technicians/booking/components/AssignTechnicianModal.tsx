/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FONTS_FAMILIES, SIZES} from '../../../../constants/theme';
import {Theme} from '../../../../@types/theme';
import {useTheme} from '@react-navigation/native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Button, FormTechniciansSelector} from '../../../../components';
import Toast from 'react-native-simple-toast';
import {
  AdminServicesDetailResponse,
  TechnicianFormValues,
} from '../../../../@types/service';
import {Formik} from 'formik';
import i18n from '../../../../i18n/i18n.config';
import {ObjectSchema} from 'yup';
import {
  technicianDataValidationSchema,
  technicianDefaultValue,
} from '../constants/ValidationSchema';
import {useAssignTechnicianAdminServicesDetail} from '../../../../api/hooks/useAdminServices';

interface IAssignTechnicianModalProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  data: AdminServicesDetailResponse;
  refetch: () => void;
}

const AssignTechnicianModal: React.FC<IAssignTechnicianModalProps> = ({
  actionSheetRef,
  data,
  refetch,
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const initialValues: TechnicianFormValues = technicianDefaultValue;

  const {mutate, status} = useAssignTechnicianAdminServicesDetail();
  const isLoading = status === 'pending';

  const [formValidationSchema, setFormValidationSchema] = useState<
    ObjectSchema<TechnicianFormValues>
  >(technicianDataValidationSchema());

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormValidationSchema(technicianDataValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onFieldSubmit = (values: TechnicianFormValues) => {
    mutate(
      {
        id: data.data_body.service.id,
        data: {
          user_technician_id: values.technician.id,
        },
      },
      {
        onSuccess: () => {
          refetch();
          actionSheetRef.current?.hide();
          Toast.show(t('toastAssignTechnician'), Toast.SHORT);
        },
      },
    );
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      closable={!isLoading}
      containerStyle={{
        backgroundColor: theme.colors.background,
        ...styles.actionContainer,
      }}>
      <View style={styles.devider} />
      <View>
        <Text style={styles.title}>{t('assignTechnicianLabel')}</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={formValidationSchema}
          enableReinitialize={true}
          onSubmit={onFieldSubmit}>
          {({handleSubmit, values}) => (
            <>
              <FormTechniciansSelector
                name="technician"
                editable={!isLoading}
                label={`*${t('technicianFieldFields.technician')}`}
              />
              {values.technician.mobile_number &&
                values.technician.branches.length && (
                  <View style={styles.infoContainer}>
                    <View style={styles.infoSection}>
                      <Text style={styles.label}>{`${t(
                        'registerFieldFields.phoneNumber',
                      )}`}</Text>
                      <Text style={styles.infoText}>
                        {values.technician.mobile_number}
                      </Text>
                    </View>
                    <View style={styles.infoSection}>
                      <Text style={styles.label}>{`${t(
                        'dataCompletenessFieldFields.branch',
                      )}`}</Text>
                      <Text style={styles.infoText}>
                        {values.technician.branches
                          .map(item => item.name)
                          .join(', ')}
                      </Text>
                    </View>
                  </View>
                )}
              <Button
                title={t('assignLabel')}
                onPress={() => handleSubmit()}
                style={{marginTop: 40}}
                loading={isLoading}
                disabled={isLoading}
              />
            </>
          )}
        </Formik>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={() => actionSheetRef.current?.hide()}
          style={styles.btnCancel}>
          <Text style={styles.btnCancelLabel}>{t('cancelLabel')}</Text>
        </TouchableOpacity>
      </View>
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
  });

export default AssignTechnicianModal;
