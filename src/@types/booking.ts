import {ApiResponse} from './apiResponse';

export enum ServiceStatus {
  Pending = 100,
  Accepted = 200,
  OnGoing = 300,
  OnGoingAlt = 310,
  OnProcess = 400,
  WaitingApproval = 500,
  Finish = 600,
  Rejected = 900,
  Canceled = 901,
}

export enum ServiceStatusKey {
  Pending = 'pending',
  Accepted = 'accepted',
  OnGoing = 'on_going',
  OnGoingAlt = 'on_going',
  OnProcess = 'on_process',
  WaitingApproval = 'waiting_approval',
  Finish = 'finish',
  Rejected = 'rejected',
  Canceled = 'cancel',
}

export type Photos = {
  image_path: string;
  image_url: string;
};

export type BookingRequestPayload = {
  machine_id: string;
  booking_date: string;
  booking_time: string;
  location: string;
  service_type: string;
  problem?: string;
  photos?: string[];
};

export type UpdateBookingRequestPayload = {
  booking_date: string;
  booking_time: string;
  location: string;
  problem: string;
};

export type CancelBookingRequestPayload = {
  reason: string;
};

export interface Service {
  id: string;
  booking_code: string;
  status: number;
  approved_by: null | string;
  assigned_by: null | string;
  service_cost: number;
  total_cost: number;
  booking_datetime: string;
  due_date: null | string;
  user_technician_id: null | string;
  user_admin_id: null | string;
  user_customer_id: string;
  machine_id: string;
  status_label: string;
  detail: ServiceDetail;
  photos: Photo[];
  created_at: string;
  updated_at: string;
}

export interface ServiceDetail {
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
  location: string;
  feedback: string | null;
  description: string | null;
  created_by: string | null;
  updated_by: string;
}

export interface Photo {
  id: string;
  service_id: string;
  image_path: string;
  service_status: number;
  caption: null | string;
  created_at: string;
  updated_at: string;
}

export type BookingRequestResponse = ApiResponse<{service: Service}>;

export type BookingParams = {
  status?: string;
  booking_code?: string;
  page?: number;
  size?: number;
};

export type Detail = {
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
};

export type UserInfo = {
  id: string;
  name: string;
  mobile_number: string;
};

export type ServiceData = {
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
  detail: Detail;
  technician: TechnicianAssigned | null;
};

export type PaginationLinks = {
  url: string | null;
  label: string;
  active: boolean;
};

export type ServicePagination = {
  current_page: number;
  data: ServiceData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type BokingDataBody = {
  current_page: number;
  data: ServiceData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type BookingResponse = ApiResponse<BokingDataBody>;

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
  user: {
    id: string;
    name: string;
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
    geo_latitude: number;
    geo_longitude: number;
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

export type Machine = {
  id: string;
  name: string | null;
  type: string | null;
  serial_number: string;
  purchased_date: string;
  image_path: string | null;
  image_path_full: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  master_machine_id: string;
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

export type ServiceCost = {
  id: string;
  service_id: string;
  sparepart_name: string;
  type: string;
  cost: number;
  amount: number;
  total_cost: number;
  note?: string | null;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  service_id: string;
  user_id: string;
  rating: number;
  review: string;
  created_at: string;
  updated_at: string;
};

export type TechnicianAssigned = {
  id: string;
  name: string;
  mobile_number: string;
  email: string;
  location: string;
  geo_latitude: string;
  geo_longitude: string;
  arrive_datetime: string;
  processing_photos: Image[];
};

export type ServiceBooking = {
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
  service_type: string;
  status_photos: StatusPhoto;
  status_logs: StatusLog[];
  status_label: string;
  detail: ServiceDetail;
  list: ServiceCost[];
  reviews: Review[];
  customer: Customer;
  machine: Machine;
  technician: TechnicianAssigned | null;
  approved_by_user: UserInfo | null;
  assigned_by_user: UserInfo | null;
  cancel: UserInfo | null;
};

export type BookingDetailResponse = ApiResponse<{service: ServiceBooking}>;
