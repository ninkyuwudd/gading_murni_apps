import ApiClient from '../../ApiClient';
import {
  MasterMachineParams,
  MasterMachineResponse,
} from '../../../@types/masterMachine';

export const getMaterMachines = async (
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
