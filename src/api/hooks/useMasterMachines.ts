import {useInfiniteQuery} from '@tanstack/react-query';
import {
  MasterMachine,
  MasterMachineParams,
  MasterMachineResponse,
} from '../../@types/masterMachine';
import {ConfigInfiniteQuery, getQueryKey} from '../../@types/query';
import {getMaterMachines} from '../services/customers/MasterMachineServices';

export const useMasterMachines = (
  params: MasterMachineParams,
  config?: ConfigInfiniteQuery<MasterMachineResponse, MasterMachine>,
) =>
  useInfiniteQuery({
    ...config,
    queryKey: getQueryKey('machines', params),
    queryFn: ({pageParam}) =>
      getMaterMachines({page: pageParam as number, ...params}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, AllPages) => {
      const morePagesExist =
        lastPage.data_body.master_machines_paginated.current_page !==
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
