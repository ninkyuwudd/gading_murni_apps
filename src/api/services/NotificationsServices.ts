import ApiClient from '../ApiClient';
import {
  NotificationCountResponse,
  NotificationsParams,
  NotificationsResponse,
  UpdateStatusReadAllResponse,
  UpdateStatusReadResponse,
} from '../../@types/notifications';

export const getNotifications = async (
  params: NotificationsParams,
): Promise<NotificationsResponse> => {
  try {
    const response: NotificationsResponse = await ApiClient.get(
      '/api/v1/inbox',
      {
        params,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateStatusReadAll =
  async (): Promise<UpdateStatusReadAllResponse> => {
    try {
      const response: UpdateStatusReadAllResponse = await ApiClient.post(
        '/api/v1/inbox/read-all',
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

export const updateStatusRead = async (
  id: string,
): Promise<UpdateStatusReadResponse> => {
  try {
    const response: UpdateStatusReadResponse = await ApiClient.post(
      `/api/v1/inbox/read/${id}`,
    );

    return response;
  } catch (error) {
    console.log('errorResponse ', error);
    throw error;
  }
};

export const getNotificationCount =
  async (): Promise<NotificationCountResponse> => {
    try {
      const response: NotificationCountResponse = await ApiClient.get(
        '/api/v1/inbox/count',
      );

      return response;
    } catch (error) {
      throw error;
    }
  };
