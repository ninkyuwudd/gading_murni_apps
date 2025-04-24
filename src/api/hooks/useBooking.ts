import {
  UseMutationResult,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  BookingDetailResponse,
  BookingParams,
  BookingRequestPayload,
  BookingRequestResponse,
  BookingResponse,
  CancelBookingRequestPayload,
  ServiceData,
  UpdateBookingRequestPayload,
} from '../../@types/booking';
import {ConfigInfiniteQuery, getQueryKey} from '../../@types/query';
import {TServiceRatingPayload} from '../../@types/service';
import {
  bookingRequest,
  cancelBookingRequest,
  getBookingDetail,
  getBookings,
  serviceRating,
  updateBookingRequest,
} from '../services/customers/BookingServices';

export const useBookingRequest = (): UseMutationResult<
  BookingRequestResponse,
  Error,
  BookingRequestPayload
> =>
  useMutation({
    mutationFn: (payload: BookingRequestPayload) => bookingRequest(payload),
    mutationKey: ['booking-request'],
  });

export const useUpdateBookingRequest = (): UseMutationResult<
  BookingRequestResponse,
  Error,
  {id: string; data: UpdateBookingRequestPayload}
> =>
  useMutation({
    mutationFn: (payload: {id: string; data: UpdateBookingRequestPayload}) =>
      updateBookingRequest(payload.id, payload.data),
    mutationKey: ['update-booking-request'],
  });

export const useCancelBookingRequest = (): UseMutationResult<
  BookingRequestResponse,
  Error,
  {id: string; data: CancelBookingRequestPayload}
> =>
  useMutation({
    mutationFn: (payload: {id: string; data: CancelBookingRequestPayload}) =>
      cancelBookingRequest(payload.id, payload.data),
    mutationKey: ['cancel-booking-request'],
  });

export const useBookings = (
  params: BookingParams,
  config?: ConfigInfiniteQuery<BookingResponse, ServiceData>,
) =>
  useInfiniteQuery({
    ...config,
    queryKey: getQueryKey('bookings', params),
    queryFn: ({pageParam}) =>
      getBookings({
        page: pageParam as number,
        ...params,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const morePagesExist =
        lastPage.data_body.current_page !==
        Math.ceil(lastPage.data_body.total / params.size!);
      if (!morePagesExist) {
        return undefined;
      }

      return AllPages.length + 1;
    },
    select: data => ({
      ...data,
      pages: data.pages.flatMap(page => page.data_body.data),
    }),
  });

export const useBookingDetail = (
  id: string,
): UseQueryResult<BookingDetailResponse, Error> =>
  useQuery({
    queryKey: getQueryKey('booking-detail'),
    queryFn: () => getBookingDetail(id),
  });

export const useServiceRating = (): UseMutationResult<
  BookingDetailResponse,
  Error,
  {id: string; data: TServiceRatingPayload}
> =>
  useMutation({
    mutationFn: (payload: {id: string; data: TServiceRatingPayload}) =>
      serviceRating(payload.id, payload.data),
    mutationKey: ['service-rating'],
  });
