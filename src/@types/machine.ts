import {ApiResponse} from './apiResponse';

export type MachineParams = {
  name?: string;
  page?: number;
  size?: number;
};

export type MachinesPaginated = {
  current_page: number;
  data: Machine[];
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

export type Machine = {
  id: string;
  name: string;
  type: string;
  serial_number: string;
  purchased_date: string;
  image_path: string;
  image_path_full: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  master_machine: {
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
  };
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type AddMachineBody = {
  master_machine_id: string;
  serial_number: string;
  purchased_date: string;
};

export type DetailMachineBarcode = {
  id: string;
  barcode_code: string;
  name: string;
  type: string;
  photo_img: string;
  barcode_img: string;
  created_at: string;
  updated_at: string;
};

export type MasterMachineParams = {
  page?: number;
  size?: number;
  search?: string;
  is_active?: boolean;
};

export type MasterMachine = {
  id: string;
  name: string;
  photo_img: string;
  barcode_img: string;
  code: string;
  machine_category_id: string;
  type: string;
  serial_number: string;
  purchased_date: string;
  image_path: string;
  image_path_full: string;
  user_id: string;
  is_active: number;
  barcode_code: string;
  photo_image_path_full: string;
  barcode_image_path_full: string;
  machine_category: MachineCategory;
  created_at: string;
  updated_at: string;
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

export type MachineCategory = {
  id: string;
  name: string;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type MachinesResponse = ApiResponse<{
  machines_paginated: MachinesPaginated;
}>;

export type MachineDetailResponse = ApiResponse<{
  machine: Machine;
}>;

export type MachineDetailByBarcodeResponse = ApiResponse<{
  mst_machine: DetailMachineBarcode | null;
}>;

export type AddMachineResponse = ApiResponse<{
  machine: Machine;
}>;

export type MasterMachineResponse = ApiResponse<{
  master_machines_paginated: MasterMachinesPaginated;
}>;
