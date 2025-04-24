import * as yup from 'yup';
import i18n from '../../../../i18n/i18n.config';

export const addMachineValidationSchema = () =>
  yup.object().shape({
    master_machine: yup.object().required(
      i18n.t('addMachineFormValidation.required', {
        field: i18n.t('addMachineFieldFields.name'),
      }),
    ),
    serial_number: yup.string().required(
      i18n.t('addMachineFormValidation.required', {
        field: i18n.t('addMachineFieldFields.serialNumber'),
      }),
    ),
    purchased_date: yup.string().required(
      i18n.t('addMachineFormValidation.required', {
        field: i18n.t('addMachineFieldFields.purchaseDate'),
      }),
    ),
  });
