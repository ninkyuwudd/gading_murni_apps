import ApiClient from '../../ApiClient';
import {
  MachineDetailResponse,
  MachineParams,
  MachinesResponse,
  AddMachineBody,
  AddMachineResponse,
  MachineDetailByBarcodeResponse,
  MasterMachineParams,
  MasterMachineResponse,
} from '../../../@types/machine';

export const getMachines = async (
  params: MachineParams,
): Promise<MachinesResponse> => {
  try {
    const response: MachinesResponse = await ApiClient.get('/api/v1/machine', {
      params,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMachineDetail = async (
  id: string,
): Promise<MachineDetailResponse> => {
  try {
    const response: MachineDetailResponse = await ApiClient.get(
      `/api/v1/machine/${id}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMachineDetailByBarcode = async (
  barcode: string,
): Promise<MachineDetailByBarcodeResponse> => {
  try {
    const response: MachineDetailByBarcodeResponse = await ApiClient.get(
      `/api/v1/master/mst_machine/${barcode}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const addMachine = async (
  body: AddMachineBody,
): Promise<AddMachineResponse> => {
  try {
    const response: AddMachineResponse = await ApiClient.post(
      '/api/v1/machine',
      body,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMachine = async (
  id: string,
  body: AddMachineBody,
): Promise<AddMachineResponse> => {
  try {
    const response: AddMachineResponse = await ApiClient.put(
      `/api/v1/machine/${id}`,
      body,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getMasterMachines = async (
  params: MasterMachineParams,
): Promise<MasterMachineResponse> => {
  try {
    const response: MasterMachineResponse = await ApiClient.get(
      '/api/v1/master-machine',
      {
        params,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};
