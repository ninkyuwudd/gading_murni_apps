import {ApiResponse} from './apiResponse';

export type MachineCategory = {
  id: string;
  name: string;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type MasterMachine = {
  id: string;
  name: string;
  photo_img: string;
  barcode_img: string | null;
  created_at: string;
  updated_at: string;
  code: string;
  machine_category_id: string;
  is_active: number;
  barcode_code: string;
  photo_image_path_full: string;
  barcode_image_path_full: string | null;
  machine_category?: MachineCategory | null;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type MasterMachinesPaginated = {
  current_page: number;
  data: MasterMachine[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type DataHeader = {
  status: string;
  message: string;
  time_stamp: string;
  trace_code: string;
};

export type MasterMachineParams = {
  search?: string;
  page?: number;
  size?: number;
  is_active?: boolean;
};

export type MasterMachineResponse = ApiResponse<{
  master_machines_paginated: MasterMachinesPaginated;
}>;
