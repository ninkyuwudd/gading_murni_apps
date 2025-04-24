import * as yup from 'yup';
import i18n from '../../../../i18n/i18n.config';
import {
  ServiceRatingTypes,
  RequestScheduleForm,
} from '../../../../@types/service';

export const requestScheduleValidationSchema = () =>
  yup.object().shape({
    date: yup.string().required(
      i18n.t('ServiceModule.RequestScheduleForm.ScheduleValidation.Required', {
        field: i18n.t('ServiceModule.RequestScheduleForm.ScheduleFields.Date'),
      }),
    ),
    time: yup.string().required(
      i18n.t('ServiceModule.RequestScheduleForm.ScheduleValidation.Required', {
        field: i18n.t('ServiceModule.RequestScheduleForm.ScheduleFields.Time'),
      }),
    ),
    location: yup.string().required(
      i18n.t('ServiceModule.RequestScheduleForm.ScheduleValidation.Required', {
        field: i18n.t(
          'ServiceModule.RequestScheduleForm.ScheduleFields.Location',
        ),
      }),
    ),
    service_type: yup
      .string()
      .oneOf(['SERVICES', 'NEW_INSTALL'])
      .required(
        i18n.t('ServiceModule.RequestScheduleForm.ScheduleValidation.Required'),
      ),
    issue: yup.string().when('service_type', {
      is: 'SERVICES',
      then: schema =>
        schema.required(
          i18n.t(
            'ServiceModule.RequestScheduleForm.ScheduleValidation.Required',
            {
              field: i18n.t(
                'ServiceModule.RequestScheduleForm.ScheduleFields.Issue',
              ),
            },
          ),
        ),
      otherwise: schema => schema.notRequired(),
    }),
    photos: yup
      .array()
      .of(
        yup.object().shape({
          image_path: yup.string().required(),
          image_url: yup.string().required(),
        }),
      )
      .when('service_type', {
        is: 'SERVICES',
        then: schema =>
          schema
            .required(
              i18n.t(
                'ServiceModule.RequestScheduleForm.ScheduleValidation.Required',
                {
                  field: i18n.t(
                    'ServiceModule.RequestScheduleForm.ScheduleFields.Photos',
                  ),
                },
              ),
            )
            .min(
              1,
              i18n.t(
                'ServiceModule.RequestScheduleForm.ScheduleValidation.Min',
                {
                  field: i18n.t(
                    'ServiceModule.RequestScheduleForm.ScheduleFields.Photos',
                  ),
                  min: 1,
                },
              ),
            ),
        otherwise: schema => schema.notRequired(),
      }),
  });

export const requestScheduleInitialForm: RequestScheduleForm = {
  date: '',
  time: '',
  location: '',
  service_type: 'SERVICES',
  issue: '',
  photos: [],
};

export const serviceScheduleValidationSchema = () =>
  yup.object().shape({
    date: yup.string().required(
      i18n.t('serviceScheduleValidation.required', {
        field: i18n.t('serviceScheduleFields.date'),
      }),
    ),
    time: yup.string().required(
      i18n.t('serviceScheduleValidation.required', {
        field: i18n.t('serviceScheduleFields.time'),
      }),
    ),
    location: yup.string().required(
      i18n.t('serviceScheduleValidation.required', {
        field: i18n.t('serviceScheduleFields.location'),
      }),
    ),
    issue: yup.string().required(
      i18n.t('serviceScheduleValidation.required', {
        field: i18n.t('serviceScheduleFields.issue'),
      }),
    ),
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

export const ratingDefaultValue: ServiceRatingTypes = {
  rating: 0,
  review: '',
};

export const ratingValidationSchema = () =>
  yup.object().shape({
    rating: yup
      .number()
      .required(
        i18n.t('ServiceModule.Rating.Form.Validation.Required', {
          field: i18n.t('ServiceModule.Rating.Form.Fields.Rating'),
        }),
      )
      .min(1, i18n.t('ServiceModule.Rating.Form.Validation.Rating'))
      .max(5, i18n.t('ServiceModule.Rating.Form.Validation.Rating')),
    review: yup.string().min(
      8,
      i18n.t('ServiceModule.Rating.Form.Validation.MinLength', {
        field: i18n.t('ServiceModule.Rating.Form.Fields.Review'),
        min: 8,
      }),
    ),
  });
