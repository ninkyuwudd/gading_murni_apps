import {
  UseMutationResult,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {ConfigInfiniteQuery, getQueryKey} from '../../@types/query';
import {
  NotificationsParams,
  NotificationsResponse,
  Notification,
  UpdateStatusReadAllResponse,
  UpdateStatusReadResponse,
  NotificationCountResponse,
} from '../../@types/notifications';
import {
  getNotifications,
  updateStatusReadAll,
  updateStatusRead,
  getNotificationCount,
} from '../services/NotificationsServices';

export const useNotifications = (
  params: NotificationsParams,
  config?: ConfigInfiniteQuery<NotificationsResponse, Notification>,
) =>
  useInfiniteQuery({
    ...config,
    queryKey: getQueryKey('notifications', params),
    queryFn: ({pageParam}) =>
      getNotifications({page: pageParam as number, ...params}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const morePagesExist =
        lastPage.data_body.inbox_paginated.current_page !==
        Math.ceil(lastPage.data_body.inbox_paginated.total / params.size!);
      if (!morePagesExist) {
        return undefined;
      }

      return AllPages.length + 1;
    },
    select: data => ({
      ...data,
      pages: data.pages.flatMap(page => page.data_body.inbox_paginated.data),
    }),
  });

export const useUpdateStatusReadAll = (): UseMutationResult<
  UpdateStatusReadAllResponse,
  Error
> =>
  useMutation({
    mutationFn: () => updateStatusReadAll(),
    mutationKey: ['update-status-read-all'],
  });

export const useUpdateStatusRead = (): UseMutationResult<
  UpdateStatusReadResponse,
  Error,
  {id: string}
> =>
  useMutation({
    mutationFn: (payload: {id: string}) => updateStatusRead(payload.id),
    mutationKey: ['update-status-read'],
  });

export const useNotificationCount = (): UseQueryResult<
  NotificationCountResponse,
  Error
> =>
  useQuery({
    queryKey: getQueryKey('notification-count'),
    queryFn: () => getNotificationCount(),
  });
