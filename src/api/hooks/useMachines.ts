import {
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import {ConfigInfiniteQuery, getQueryKey} from '../../@types/query';
import {
  MachineParams,
  MachinesResponse,
  Machine,
  MachineDetailResponse,
  AddMachineBody,
  AddMachineResponse,
  MachineDetailByBarcodeResponse,
  MasterMachineResponse,
  MasterMachineParams,
  MasterMachine,
} from '../../@types/machine';
import {
  getMachineDetail,
  getMachineDetailByBarcode,
  getMachines,
  addMachine,
  updateMachine,
  getMasterMachines,
} from '../services/customers/MachineServices';

export const useMachines = (
  params: MachineParams,
  config?: ConfigInfiniteQuery<MachinesResponse, Machine>,
) =>
  useInfiniteQuery({
    ...config,
    queryKey: getQueryKey('machines', params),
    queryFn: ({pageParam}) =>
      getMachines({page: pageParam as number, ...params}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const morePagesExist =
        lastPage.data_body.machines_paginated.current_page !==
        Math.ceil(lastPage.data_body.machines_paginated.total / params.size!);
      if (!morePagesExist) {
        return undefined;
      }

      return AllPages.length + 1;
    },
    select: data => ({
      ...data,
      pages: data.pages.flatMap(page => page.data_body.machines_paginated.data),
    }),
  });

export const useMachineDetail = (
  id: string,
): UseQueryResult<MachineDetailResponse, Error> =>
  useQuery({
    queryKey: getQueryKey('machine-detail'),
    queryFn: () => getMachineDetail(id),
    enabled: Boolean(id),
  });

export const useMachineDetailByBarcode = (): UseMutationResult<
  MachineDetailByBarcodeResponse,
  Error,
  {barcode: string}
> =>
  useMutation({
    mutationFn: ({barcode}) => getMachineDetailByBarcode(barcode),
    mutationKey: ['machine-upsert'],
  });

export const useAddMachine = (): UseMutationResult<
  AddMachineResponse,
  Error,
  AddMachineBody
> =>
  useMutation({
    mutationFn: (body: AddMachineBody) => addMachine(body),
    mutationKey: ['add-machine'],
  });

export const useUpdateMachine = (): UseMutationResult<
  AddMachineResponse,
  Error,
  {id: string; body: AddMachineBody}
> =>
  useMutation({
    mutationFn: (payload: {id: string; body: AddMachineBody}) =>
      updateMachine(payload.id, payload.body),
    mutationKey: ['update-machine'],
  });

export const useMasterMachines = (
  params: MasterMachineParams,
  config?: ConfigInfiniteQuery<MasterMachineResponse, MasterMachine>,
) =>
  useInfiniteQuery({
    ...config,
    queryKey: getQueryKey('master-machine', params),
    queryFn: ({pageParam}) =>
      getMasterMachines({page: pageParam as number, ...params}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const morePagesExist =
        AllPages.length !==
        Math.ceil(
          lastPage.data_body.master_machines_paginated.total / params.size!,
        );
      if (!morePagesExist) {
        return undefined;
      }

      return AllPages.length + 1;
    },
    select: data => ({
      ...data,
      pages: data.pages.flatMap(
        page => page.data_body.master_machines_paginated.data,
      ),
    }),
  });
