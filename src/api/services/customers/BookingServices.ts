import {
  BookingDetailResponse,
  BookingParams,
  BookingRequestPayload,
  BookingRequestResponse,
  BookingResponse,
  CancelBookingRequestPayload,
  UpdateBookingRequestPayload,
} from '../../../@types/booking';
import {TServiceRatingPayload} from '../../../@types/service';
import ApiClient from '../../ApiClient';

export const bookingRequest = async (
  req: BookingRequestPayload,
): Promise<BookingRequestResponse> => {
  try {
    const response: BookingRequestResponse = await ApiClient.post(
      '/api/v1/service/booking',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateBookingRequest = async (
  id: string,
  req: UpdateBookingRequestPayload,
): Promise<BookingRequestResponse> => {
  try {
    const response: BookingRequestResponse = await ApiClient.put(
      `/api/v1/service/booking/${id}`,
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const cancelBookingRequest = async (
  id: string,
  req: CancelBookingRequestPayload,
): Promise<BookingRequestResponse> => {
  try {
    const response: BookingRequestResponse = await ApiClient.put(
      `/api/v1/service/${id}/cancel`,
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBookings = async (
  params: BookingParams,
): Promise<BookingResponse> => {
  try {
    const response: BookingResponse = await ApiClient.get('/api/v1/service', {
      params,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getBookingDetail = async (
  id: string,
): Promise<BookingDetailResponse> => {
  try {
    const response: BookingDetailResponse = await ApiClient.get(
      `/api/v1/service/${id}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const serviceRating = async (
  id: string,
  req: TServiceRatingPayload,
): Promise<BookingDetailResponse> => {
  try {
    const response: BookingDetailResponse = await ApiClient.put(
      `/api/v1/service/${id}/finish`,
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
