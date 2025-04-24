import {UseInfiniteQueryOptions} from '@tanstack/react-query';

type KeyParams = {
  [key: string]: any;
};

export const getQueryKey = <T extends KeyParams>(key: string, params?: T) => {
  return [key, ...(params ? [params] : [])];
};

export type ConfigInfiniteQuery<Response, Data> = UseInfiniteQueryOptions<
  Response,
  Error,
  Data,
  Response,
  Array<string | KeyParams>,
  number
>;
