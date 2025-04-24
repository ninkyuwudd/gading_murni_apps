import {
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  AdminUserServicesParams,
  AdminUsersResponse,
  TAdminUserRoleDetailResponse,
  UserData,
} from '../../@types/adminUser';
import {ConfigInfiniteQuery, getQueryKey} from '../../@types/query';
import {
  getAdminUserRoleDetail,
  getAdminUserServices,
} from '../services/technicians/AdminUserServices';

export const useAdminUserServices = (
  params: AdminUserServicesParams,
  config?: ConfigInfiniteQuery<AdminUsersResponse, UserData>,
) =>
  useInfiniteQuery({
    ...config,
    queryKey: getQueryKey('admin-user-services', params),
    queryFn: ({pageParam}) =>
      getAdminUserServices({
        page: pageParam as number,
        ...params,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const morePagesExist =
        lastPage.data_body.users_paginated.current_page !==
        Math.ceil(lastPage.data_body.users_paginated.total / params.size!);
      if (!morePagesExist) {
        return undefined;
      }

      return AllPages.length + 1;
    },
    select: data => ({
      ...data,
      pages: data.pages.flatMap(page => page.data_body.users_paginated.data),
    }),
  });

export const useAdminUserRoleDetail = (
  roleId: number,
): UseQueryResult<TAdminUserRoleDetailResponse, Error> =>
  useQuery({
    queryKey: getQueryKey('admin-user-role-detail'),
    queryFn: () => getAdminUserRoleDetail(roleId),
    enabled: Boolean(roleId),
  });
