import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ScanBarcode} from '../../dashboard/components';
import {
  FormDateInput,
  FormInput,
  Button,
  FormMasterMachinesSelector,
} from '../../../../components';
import {COLORS, FONTS_FAMILIES} from '../../../../constants/theme';
import {Formik, FormikHelpers} from 'formik';
import {addMachineValidationSchema} from '../constants/ValidationSchema';
import {ObjectSchema} from 'yup';
import i18n from '../../../../i18n/i18n.config';
import {
  useAddMachine,
  useUpdateMachine,
} from '../../../../api/hooks/useMachines';
import {AddMachineScreenProps} from '../../../../@types/navigation';
import {useRoute} from '@react-navigation/native';
import {errorFormValidation} from '../../../../utils/Validations';
import {navigationRef} from '../../../../navigations/navigationService';
import Toast from 'react-native-simple-toast';
import {MasterMachine} from '../../../../@types/masterMachine';

type FormValues = {
  master_machine: MasterMachine;
  serial_number: string;
  purchased_date: string;
};

const AddMyMachine: React.FC = () => {
  const {t} = useTranslation();
  const [formAddMachineValidationSchema, setFormAddMachineValidationSchema] =
    useState<ObjectSchema<FormValues>>(addMachineValidationSchema());
  const {mutate, status} = useAddMachine();
  const {mutate: mutateUpdateMachine, status: statusUpdate} =
    useUpdateMachine();
  const isLoading = status === 'pending';
  const updateLoading = statusUpdate === 'pending';
  const route = useRoute<AddMachineScreenProps['route']>();

  const initialValues: FormValues = {
    master_machine: {
      id:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.id
          : '',
      name:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.name
          : '',
      photo_img:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.photo_img
          : '',
      barcode_img:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.barcode_img
          : null,
      created_at:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.created_at
          : '',
      updated_at:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.updated_at
          : '',
      code:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.code
          : '',
      machine_category_id:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.machine_category_id
          : '',
      is_active:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.is_active
          : 0,
      barcode_code:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.barcode_code
          : '',
      photo_image_path_full:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.photo_image_path_full
          : '',
      barcode_image_path_full:
        route.params && route.params.master_machine?.id
          ? route.params.master_machine.barcode_image_path_full
          : null,
    },
    serial_number:
      route.params && route.params.serial_number
        ? route.params.serial_number
        : '',
    purchased_date:
      route.params && route.params.purchased_date
        ? route.params.purchased_date
        : '',
  };

  useEffect(() => {
    const handleLanguageChange = () =>
      setFormAddMachineValidationSchema(addMachineValidationSchema);

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const onScanBarcode = (
    barcode: string,
    setFieldValue: FormikHelpers<FormValues>['setFieldValue'],
  ) => {
    const parseBarcode = JSON.parse(barcode) as string[];
    setFieldValue('name', parseBarcode[0], false);
    setFieldValue('type', parseBarcode[1], false);
    setFieldValue('serial_number', parseBarcode[2], false);
  };

  const onFieldSubmit = async (values: FormValues): Promise<void> => {
    if (route.params?.id) {
      mutateUpdateMachine(
        {
          id: route.params?.id,
          body: {
            master_machine_id: values.master_machine.id,
            serial_number: values.serial_number,
            purchased_date: values.purchased_date,
          },
        },
        {
          onSuccess: () => {
            navigationRef.goBack();
            Toast.show(t('MachineModule.Messages.UpdatedMachine'), Toast.SHORT);
          },
        },
      );
    } else {
      mutate(
        {
          master_machine_id: values.master_machine.id,
          serial_number: values.serial_number,
          purchased_date: values.purchased_date,
        },
        {
          onSuccess: () => {
            navigationRef.goBack();
            Toast.show(t('MachineModule.Messages.AddedMachine'), Toast.SHORT);
          },
        },
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Formik
          initialValues={initialValues}
          validationSchema={formAddMachineValidationSchema}
          enableReinitialize={true}
          onSubmit={onFieldSubmit}>
          {({handleSubmit, values, setFieldValue}) => (
            <>
              <View style={styles.scanBarcodeView}>
                <Text style={styles.scanBarcodeInformation}>
                  {t('scanBarcodeInformation')}
                </Text>
                <ScanBarcode
                  resultScan={barcode => onScanBarcode(barcode, setFieldValue)}
                />
              </View>
              <View style={styles.formikView}>
                <FormMasterMachinesSelector
                  name="master_machine"
                  label={`*${t('addMachineFieldFields.name')}`}
                  editable={!isLoading || !updateLoading}
                />
                <FormInput
                  name="serial_number"
                  label={`*${t('addMachineFieldFields.serialNumber')}`}
                  placeholder={t(
                    'addMachineFieldFields.serialNumberPlaceHolder',
                  )}
                  editable={!isLoading || !updateLoading}
                />
                <FormDateInput
                  name="purchased_date"
                  label={`*${t('addMachineFieldFields.purchaseDate')}`}
                  minimumDate={false}
                  editable={!isLoading || !updateLoading}
                />
                <Button
                  title={t('saveLabel')}
                  onPress={() => {
                    handleSubmit();
                    errorFormValidation(values, formAddMachineValidationSchema);
                  }}
                  style={styles.saveButton}
                  disabled={isLoading || updateLoading}
                  loading={isLoading || updateLoading}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  scanBarcodeView: {
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBarcodeInformation: {
    fontFamily: FONTS_FAMILIES.medium,
    fontSize: 16,
    textAlign: 'center',
  },
  scanBarcodeButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 30,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  scanBarcode: {
    color: COLORS.primary,
    fontFamily: FONTS_FAMILIES.bold,
    fontSize: 14,
    marginLeft: 6,
  },
  formikView: {
    flex: 1,
    marginVertical: 40,
  },
  saveButton: {
    marginVertical: 24,
  },
});

export default AddMyMachine;
