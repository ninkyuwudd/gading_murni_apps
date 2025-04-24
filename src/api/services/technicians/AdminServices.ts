import {
  AdminServicesParams,
  AdminServicesResponse,
  AdminServicesDetailResponse,
  UpdateBookingRequestPayload,
  AssignTechnicianRequestPayload,
  TechnicianOnLocationRequestPayload,
  AfterServiceRequestPayload,
  AfterServiceItemsRequestPayload,
} from '../../../@types/service';
import ApiClient from '../../ApiClient';

export const getAdminServices = async (
  params: AdminServicesParams,
): Promise<AdminServicesResponse> => {
  try {
    const response: AdminServicesResponse = await ApiClient.get(
      '/api/v1/admin/service',
      {
        params,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getDetailAdminServices = async (
  id: string,
): Promise<AdminServicesDetailResponse> => {
  try {
    const response: AdminServicesDetailResponse = await ApiClient.get(
      `/api/v1/admin/service/${id}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateDetailAdminServices = async (
  id: string,
  req: UpdateBookingRequestPayload,
): Promise<AdminServicesDetailResponse> => {
  try {
    const response: AdminServicesDetailResponse = await ApiClient.put(
      `/api/v1/admin/service/${id}/data`,
      req,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const acceptDetailAdminServices = async (
  id: string,
): Promise<AdminServicesDetailResponse> => {
  try {
    const response: AdminServicesDetailResponse = await ApiClient.put(
      `/api/v1/admin/service/${id}/accepted`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const assignTechnicianAdminServices = async (
  id: string,
  req: AssignTechnicianRequestPayload,
): Promise<AdminServicesDetailResponse> => {
  try {
    const response: AdminServicesDetailResponse = await ApiClient.put(
      `/api/v1/admin/service/${id}/assign`,
      req,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const technicianOnLocationAdminServices = async (
  id: string,
  req: TechnicianOnLocationRequestPayload,
): Promise<AdminServicesDetailResponse> => {
  try {
    const response: AdminServicesDetailResponse = await ApiClient.put(
      `/api/v1/admin/service/${id}/processing`,
      req,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const afterServiceAdminServices = async (
  id: string,
  req: AfterServiceRequestPayload,
): Promise<AdminServicesDetailResponse> => {
  try {
    const response: AdminServicesDetailResponse = await ApiClient.put(
      `/api/v1/admin/service/${id}/waiting-approval`,
      req,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const afterServiceItemsAdminServices = async (
  id: string,
  req: AfterServiceItemsRequestPayload,
): Promise<AdminServicesDetailResponse> => {
  try {
    const response: AdminServicesDetailResponse = await ApiClient.post(
      `/api/v1/admin/service/${id}/list`,
      req,
    );

    return response;
  } catch (error) {
    throw error;
  }
};
