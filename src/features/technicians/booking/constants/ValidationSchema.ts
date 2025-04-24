import * as yup from 'yup';
import i18n from '../../../../i18n/i18n.config';
import {
  AfterServiceFormValues,
  AfterServiceItem,
  CustomerDataFormValues,
  OnLocationFormValues,
  TechnicianFormValues,
} from '../../../../@types/service';

export const customerDataValidationSchema = () =>
  yup.object().shape({
    bookingNumber: yup.string().required(),
    fullName: yup.string().required(
      i18n.t('registerFormValidation.required', {
        field: i18n.t('registerFieldFields.fullName'),
      }),
    ),
    companyName: yup.string(),
    email: yup
      .string()
      .email(i18n.t('registerFormValidation.email'))
      .required(
        i18n.t('registerFormValidation.required', {
          field: i18n.t('registerFieldFields.email'),
        }),
      ),
    phoneNumber: yup
      .string()
      .matches(
        /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
        i18n.t('registerFormValidation.phoneNumber'),
      )
      .required(
        i18n.t('registerFormValidation.required', {
          field: i18n.t('registerFieldFields.phoneNumber'),
        }),
      ),
    nearestBranch: yup.object({
      id: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.nearestBranch'),
        }),
      ),
      name: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.nearestBranch'),
        }),
      ),
      description: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.nearestBranch'),
        }),
      ),
      is_active: yup.number().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.nearestBranch'),
        }),
      ),
      created_at: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.nearestBranch'),
        }),
      ),
      updated_at: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.nearestBranch'),
        }),
      ),
    }),
    province: yup.object({
      code: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.province'),
        }),
      ),
      province: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.province'),
        }),
      ),
    }),
    regency: yup.object({
      code: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.regency'),
        }),
      ),
      province: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.regency'),
        }),
      ),
      regency: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.regency'),
        }),
      ),
      type: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.regency'),
        }),
      ),
    }),
    district: yup.object({
      code: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.district'),
        }),
      ),
      regency: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.district'),
        }),
      ),
      district: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.district'),
        }),
      ),
    }),
    village: yup.object({
      code: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.village'),
        }),
      ),
      district: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.village'),
        }),
      ),
      village: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.village'),
        }),
      ),
      postalCode: yup.string().required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.village'),
        }),
      ),
    }),
    postalCode: yup
      .string()
      .required(
        i18n.t('dataCompletenessValidation.required', {
          field: i18n.t('dataCompletenessFieldFields.postalCode'),
        }),
      )
      .matches(/^\d{5}$/, {
        message: i18n.t('dataCompletenessValidation.postalCode'),
        excludeEmptyString: true,
      }),
    location: yup.string().required(
      i18n.t('serviceScheduleValidation.required', {
        field: i18n.t('serviceScheduleFields.location'),
      }),
    ),
    master_machine: yup.object().required(
      i18n.t('addMachineFormValidation.required', {
        field: i18n.t('addMachineFieldFields.name'),
      }),
    ),
    serialNumber: yup.string().required(
      i18n.t('dataMachineValidation.required', {
        field: i18n.t('dataMachineFieldFields.serialNumber'),
      }),
    ),
    purchaseDate: yup.string().required(
      i18n.t('dataMachineValidation.required', {
        field: i18n.t('dataMachineFieldFields.purchaseDate'),
      }),
    ),
    bookingDate: yup.string().required(
      i18n.t('dataMachineValidation.required', {
        field: i18n.t('dataMachineFieldFields.bookingDate'),
      }),
    ),
    bookingTime: yup.string().required(
      i18n.t('dataMachineValidation.required', {
        field: i18n.t('dataMachineFieldFields.bookingTime'),
      }),
    ),
    serviceSchedule: yup.string().required(
      i18n.t('dataMachineValidation.required', {
        field: i18n.t('dataMachineFieldFields.serviceDate'),
      }),
    ),
    serviceTimeSchedule: yup.string().required(
      i18n.t('dataMachineValidation.required', {
        field: i18n.t('dataMachineFieldFields.serviceTimeSchedule'),
      }),
    ),
  });

export const customerDataDefaultValue: CustomerDataFormValues = {
  bookingNumber: '',
  fullName: '',
  companyName: '',
  email: '',
  phoneNumber: '',
  nearestBranch: {
    id: '',
    name: '',
    description: '',
    is_active: 0,
    created_at: '',
    updated_at: '',
  },
  province: {
    code: '',
    province: '',
  },
  regency: {
    code: '',
    province: '',
    regency: '',
    type: '',
  },
  district: {
    code: '',
    regency: '',
    district: '',
  },
  village: {
    code: '',
    district: '',
    village: '',
    postalCode: '',
  },
  postalCode: '',
  location: '',
  master_machine: {
    id: '',
    name: '',
    photo_img: '',
    barcode_img: null,
    created_at: '',
    updated_at: '',
    code: '',
    machine_category_id: '',
    is_active: 0,
    barcode_code: '',
    photo_image_path_full: '',
    barcode_image_path_full: null,
  },
  serialNumber: '',
  purchaseDate: '',
  bookingDate: '',
  serviceSchedule: '',
  serviceTimeSchedule: '',
  bookingTime: '',
};

export const technicianDataValidationSchema = () =>
  yup.object().shape({
    technician: yup.object({
      id: yup.string().required(
        i18n.t('technicianFormValidation.required', {
          field: i18n.t('technicianFieldFields.technician'),
        }),
      ),
      name: yup.string().required(
        i18n.t('technicianFormValidation.required', {
          field: i18n.t('technicianFieldFields.technician'),
        }),
      ),
      mobile_number: yup.string().required(
        i18n.t('technicianFormValidation.required', {
          field: i18n.t('technicianFieldFields.technician'),
        }),
      ),
      branches: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string().required(),
            name: yup.string().required(),
          }),
        )
        .required(
          i18n.t('technicianFormValidation.required', {
            field: i18n.t('technicianFieldFields.technician'),
          }),
        )
        .min(
          1,
          i18n.t('technicianFormValidation.min', {
            field: i18n.t('technicianFieldFields.technician'),
            min: 1,
          }),
        ),
    }),
  });

export const technicianDefaultValue: TechnicianFormValues = {
  technician: {
    id: '',
    name: '',
    mobile_number: '',
    branches: [{id: '', name: ''}],
  },
};

export const onLocationDefaultValue: OnLocationFormValues = {
  photos: [],
};

export const onLocationDataValidationSchema = () =>
  yup.object().shape({
    photos: yup
      .array()
      .of(
        yup.object().shape({
          image_path: yup.string().required(),
          image_url: yup.string().required(),
        }),
      )
      .required(
        i18n.t('serviceScheduleValidation.required', {
          field: i18n.t('serviceScheduleFields.photos'),
        }),
      )
      .min(
        1,
        i18n.t('serviceScheduleValidation.min', {
          field: i18n.t('serviceScheduleFields.photos'),
          min: 1,
        }),
      ),
  });

export const afterServiceItemDefaultValue: AfterServiceItem = {
  sparepartName: '',
  type: 'Service',
  cost: '',
  amount: '',
  note: undefined,
};

export const afterServiceDefaultValue: AfterServiceFormValues = {
  description: '',
  feedback: '',
  photos: [],
  serviceItems: {
    serviceCost: '',
    list: [],
  },
};

export const afterServiceItemValidationSchema = () =>
  yup.object().shape({
    sparepartName: yup.string().required(
      i18n.t('afterServiceFormValidation.required', {
        field: i18n.t('afterServiceFieldFields.sparepartName'),
      }),
    ),
    type: yup.string().required(
      i18n.t('afterServiceFormValidation.required', {
        field: i18n.t('afterServiceFieldFields.type'),
      }),
    ),
    cost: yup
      .string()
      .matches(
        /^[1-9]/,
        i18n.t('afterServiceFormValidation.required', {
          field: i18n.t('afterServiceFieldFields.cost'),
        }),
      )
      .required(
        i18n.t('afterServiceFormValidation.required', {
          field: i18n.t('afterServiceFieldFields.cost'),
        }),
      ),
    amount: yup
      .string()
      .matches(
        /^[1-9]/,
        i18n.t('afterServiceFormValidation.required', {
          field: i18n.t('afterServiceFieldFields.amount'),
        }),
      )
      .required(
        i18n.t('afterServiceFormValidation.required', {
          field: i18n.t('afterServiceFieldFields.amount'),
        }),
      ),
    note: yup.string().optional(),
  });

export const afterServiceValidationSchema = () =>
  yup.object().shape({
    description: yup.string().required(
      i18n.t('afterServiceFormValidation.required', {
        field: i18n.t('afterServiceFieldFields.description'),
      }),
    ),
    feedback: yup.string().required(
      i18n.t('afterServiceFormValidation.required', {
        field: i18n.t('afterServiceFieldFields.feedback'),
      }),
    ),
    photos: yup
      .array()
      .of(
        yup.object().shape({
          imagePath: yup.string().required(),
          imageUrl: yup.string().required(),
        }),
      )
      .required(
        i18n.t('serviceScheduleValidation.required', {
          field: i18n.t('serviceScheduleFields.photos'),
        }),
      )
      .min(
        1,
        i18n.t('serviceScheduleValidation.min', {
          field: i18n.t('serviceScheduleFields.photos'),
          min: 1,
        }),
      ),
    serviceItems: yup.object().shape({
      serviceCost: yup
        .string()
        .matches(
          /^[1-9]/,
          i18n.t('afterServiceFormValidation.required', {
            field: i18n.t('afterServiceFieldFields.serviceCost'),
          }),
        )
        .required(
          i18n.t('afterServiceFormValidation.required', {
            field: i18n.t('afterServiceFieldFields.serviceCost'),
          }),
        ),
      list: yup
        .array()
        .of(afterServiceItemValidationSchema())
        .required(
          i18n.t('serviceScheduleValidation.required', {
            field: i18n.t('serviceScheduleFields.photos'),
          }),
        )
        .min(
          1,
          i18n.t('serviceScheduleValidation.min', {
            field: i18n.t('serviceScheduleFields.photos'),
            min: 1,
          }),
        ),
    }),
  });
