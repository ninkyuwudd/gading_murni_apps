import * as yup from 'yup';
import i18n from '../../../../i18n/i18n.config';

export const cancelBookingValidationSchema = () =>
  yup.object().shape({
    reasons: yup.string().required(
      i18n.t(
        'BookingModule.BookingDetail.CancelConfirmation.Form.Validation.Required',
        {
          field: i18n.t(
            'BookingModule.BookingDetail.CancelConfirmation.Form.Fields.Reasons',
          ),
        },
      ),
    ),
  });
