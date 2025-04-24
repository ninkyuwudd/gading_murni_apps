import {AxiosRequestConfig} from 'axios';
import {
  AdminProfileDetailResponse,
  AdminProfilePayload,
  AdminProfileResponse,
  AdminUserServicesParams,
  AdminUsersResponse,
  PasswordAdminPayload,
  PasswordAdminResponse,
  TAdminUserRoleDetailResponse,
} from '../../../@types/adminUser';
import ApiClient from '../../ApiClient';

export const getAdminUserServices = async (
  params: AdminUserServicesParams,
): Promise<AdminUsersResponse> => {
  try {
    const response: AdminUsersResponse = await ApiClient.get(
      '/api/v1/admin/user',
      {
        params,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAdminUserRoleDetail = async (
  id: number,
): Promise<TAdminUserRoleDetailResponse> => {
  try {
    const response: TAdminUserRoleDetailResponse = await ApiClient.get(
      `/api/v1/admin/role/${id}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAdminProfile = async (config?: AxiosRequestConfig) => {
  try {
    const response: AdminProfileDetailResponse = await ApiClient.get(
      '/api/v1/admin/profile',
      config,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAdminProfile = async (
  payload: AdminProfilePayload,
): Promise<AdminProfileResponse> => {
  try {
    const response: AdminProfileResponse = await ApiClient.put(
      '/api/v1/admin/profile',
      payload,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordAdmin = async (
  payload: PasswordAdminPayload,
): Promise<PasswordAdminResponse> => {
  try {
    const response: PasswordAdminResponse = await ApiClient.post(
      '/api/v1/auth/change-password',
      payload,
    );

    return response;
  } catch (error) {
    throw error;
  }
};
