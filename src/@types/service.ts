import {ApiResponse} from './apiResponse';
import {MasterMachine} from './masterMachine';

export type ServiceDetail = {
  id: string;
  booking_code: string;
  status: number;
  approved_by: string | null;
  assigned_by: string | null;
  service_cost: number;
  total_cost: number;
  booking_datetime: string;
  due_date: string | null;
  user_technician_id: string | null;
  user_admin_id: string | null;
  created_at: string;
  updated_at: string;
  user_customer_id: string;
  machine_id: string;
  status_label: string;
  machine: Machine;
  customer: Customer;
  detail: ServiceDetailInfo | null;
  technician: Technician | null;
};

export type Machine = {
  id: string;
  name: string;
  type: string;
  serial_number: string;
  purchased_date: string;
  image_path: string;
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

export type Customer = {
  id: string;
  name: string;
  email: string;
  mobile_number: string;
  address_province_id: number;
  address_city_id: string;
  address_district_id: number;
  address_village_id: number;
  address_detail: string;
  address_village: string;
  address_district: string;
  address_city: string;
  address_province: string;
  address_postal_code: string;
  company_name: string;
  detail: {
    user_id: string;
    geo_latitude: string;
    geo_longitude: string;
    geo_url: string | null;
    company_name: string;
    is_completed: number;
    created_at: string;
    updated_at: string;
  };
  branches: {
    id: string;
    name: string;
    description: string;
    is_active: number;
    created_at: string;
    updated_at: string;
    pivot: {
      user_id: string;
      branch_id: string;
    };
  }[];
};

export type ServiceDetailInfo = {
  id: string;
  service_id: string;
  schedule_datetime: string | null;
  assign_datetime: string | null;
  tech_departure_datetime: string | null;
  tech_arrive_datetime: string | null;
  start_datetime: string | null;
  finish_datetime: string | null;
  cust_finish_approval_datetime: string | null;
  problem: string;
  created_at: string;
  updated_at: string;
  location: string | null;
  feedback: string | null;
  description: string | null;
  created_by: string;
  updated_by: string | null;
};

export type Technician = {
  id: string;
  name: string;
  mobile_number: string;
  email: string;
  location: string | null;
  geo_latitude: string | null;
  geo_longitude: string | null;
  arrive_datetime: string | null;
};

export type PaginatedServices = {
  current_page: number;
  data: ServiceDetail[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type Link = {
  url: string | null;
  label: string;
  active: boolean;
};

export type AdminServicesParams = {
  booking_code?: string;
  page?: number;
  size?: number;
  status?: string;
};

export type User = {
  id: string;
  name: string;
};

export type Service = {
  id: string;
  booking_code: string;
  status: number;
  approved_by: string;
  assigned_by: string;
  service_cost: number;
  total_cost: number;
  booking_datetime: string;
  due_date: string | null;
  user_technician_id: string;
  user_admin_id: string | null;
  created_at: string;
  service_type: 'NEW_INSTALL' | 'SERVICES';
  updated_at: string;
  user_customer_id: string;
  machine_id: string;
  status_photos: StatusPhoto;
  status_logs: StatusLog[];
  status_label: string;
  detail: Detail;
  list: any[];
  reviews: any[];
  customer: Customer;
  machine: Machine;
  technician: Technician;
  approved_by_user: User;
  assigned_by_user: User;
  cancel: any | null;
};

export type Image = {
  id: string;
  service_id: string;
  image_path: string;
  service_status: number;
  caption: string | null;
  created_at: string;
  updated_at: string;
  service_status_label: string;
  image_path_full: string;
};

export type StatusPhoto = {
  pending: Image[];
  waiting_approval: Image[];
  on_process: Image[];
};

export type StatusLog = {
  id: string;
  timestamp: string;
  service_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  service_status: number;
  title: string;
  caption: string;
  service_status_label: string;
  user: User;
};

export type Detail = {
  id: string;
  service_id: string;
  schedule_datetime: string;
  assign_datetime: string;
  tech_departure_datetime: string | null;
  tech_arrive_datetime: string | null;
  start_datetime: string | null;
  finish_datetime: string | null;
  cust_finish_approval_datetime: string | null;
  problem: string;
  created_at: string;
  updated_at: string;
  location: string | null;
  feedback: string | null;
  description: string | null;
  created_by: string;
  updated_by: string;
};

export type AdminServicesResponse = ApiResponse<{
  services_paginated: PaginatedServices;
}>;

export type AdminServicesDetailResponse = ApiResponse<{
  service: Service;
}>;

type Province = {
  code: string;
  province: string;
};

type Regency = {
  code: string;
  province: string;
  regency: string;
  type: string;
};

type District = {
  code: string;
  regency: string;
  district: string;
};

type Village = {
  code: string;
  district: string;
  village: string;
  postalCode: string;
};

type Branch = {
  id: string;
  name: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type CustomerDataFormValues = {
  bookingNumber: string;
  fullName: string;
  companyName?: string;
  email: string;
  phoneNumber: string;
  nearestBranch: Branch;
  province: Province;
  regency: Regency;
  district: District;
  village: Village;
  postalCode: string;
  location: string;
  machine_id: string;
  master_machine: MasterMachine;
  serialNumber: string;
  purchaseDate: string;
  bookingDate: string;
  bookingTime: string;
  serviceSchedule: string;
  serviceTimeSchedule: string;
};

export type CustomerInfo = {
  name: string;
  email: string;
  mobile_number: string;
  address_detail: string;
  address_province_id: string;
  address_city_id: string;
  address_district_id: string;
  address_village_id: string;
  address_village: string;
  address_district: string;
  address_city: string;
  address_province: string;
  address_postal_code: string;
  company_name?: string;
};

export type MachineInfo = {
  machine_id: string;
  master_machine_id: string;
  serial_number: string;
  purchased_date: string;
};

export type UpdateBookingRequestPayload = {
  schedule_datetime: string;
  customer: CustomerInfo;
  machine: MachineInfo;
};

export type TechnicianFormValues = {
  technician: {
    id: string;
    name: string;
    mobile_number: string;
    branches: {
      id: string;
      name: string;
    }[];
  };
};

export type AssignTechnicianRequestPayload = {
  user_technician_id: string;
};

export type OnLocationFormValues = {
  photos: {
    image_path: string;
    image_url: string;
  }[];
};

export type TechnicianOnLocationRequestPayload = {
  photos: string[];
  location_log: {
    location: string;
    geo_latitude: string;
    geo_longitude: string;
  };
};

export type AfterServiceItem = {
  sparepartName: string;
  type: string;
  cost: string;
  amount: string;
  note?: string | undefined;
};

export type AfterServiceFormValues = {
  description: string;
  feedback: string;
  photos: {
    imagePath: string;
    imageUrl: string;
  }[];
  serviceItems: {
    serviceCost: string;
    list: AfterServiceItem[];
  };
};

export type AfterServiceRequestPayload = {
  description: string;
  feedback: string;
  photos: string[];
};

export type AfterServiceItemsRequestPayload = {
  service_cost: number;
  list: {
    sparepart_name: string;
    type: string;
    cost: number;
    amount: number;
    note: string;
  }[];
};

export type ServiceRatingTypes = {
  rating: number;
  review?: string;
};

export type TServiceRatingPayload = {
  review: ServiceRatingTypes;
};

export type RequestScheduleForm = {
  date: string;
  time: string;
  location: string;
  service_type: string;
  issue?: string;
  photos?: {image_path: string; image_url: string}[];
};
