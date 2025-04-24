import {ApiResponse} from './apiResponse';

export type UsersPaginated = {
  current_page: number;
  data: UserData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  is_otp_verified: boolean;
  is_default_password: boolean;
  mobile_number: string;
  type: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  branches: UserBranch[];
  roles: UserRole[];
};

export type UserBranch = {
  id: string;
  name: string;
  pivot: BranchPivot;
};

export type BranchPivot = {
  user_id: string;
  branch_id: string;
};

export type UserRole = {
  id: number;
  name: string;
  name_alias: string;
  pivot: RolePivot;
};

export type RolePivot = {
  model_type: string;
  model_id: string;
  role_id: number;
};

export type PaginationLink = {
  url: null | string;
  label: string;
  active: boolean;
};

export type AdminUserServicesParams = {
  keyword?: string;
  is_active?: number;
  type?: string;
  size?: number;
  page?: number;
};

export type AdminUsersResponse = ApiResponse<{users_paginated: UsersPaginated}>;

interface Role {
  id: number;
  name: string;
  name_alias: string;
  access_menus: AccessMenu[];
  guard_name: string;
  created_at: string;
  updated_at: string;
  is_active: number;
  description: string;
}

interface AccessMenu {
  name: string;
  actions: string[];
}

export type TAdminUserRoleDetailResponse = ApiResponse<{role: Role}>;

export type AdminProfilePayload = {
  email?: string;
  full_name?: string;
  mobile_number?: string;
  image_path?: string;
};

type ProfileDetail = {
  user_id: string;
  full_name: string;
  image_path: string;
  adress_detail: string | null;
  address_city_id: string;
  created_at: string;
  updated_at: string;
  address_detail: string;
  address_province: string;
  address_city: string;
  address_district: string;
  address_village: string;
  address_postal_code: string;
  address_province_id: number;
  address_district_id: number;
  address_village_id: number;
  image_path_full: string;
};

interface UserProfile {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  is_otp_verified: boolean;
  is_default_password: boolean;
  mobile_number: string;
  type: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string;
  profile: ProfileDetail;
}

export type AdminProfileResponse = ApiResponse<{user: UserProfile}>;

interface AdminProfileDetail {
  user_id: string;
  full_name: string;
  image_path: string;
  adress_detail: string | null;
  address_city_id: string;
  created_at: string;
  updated_at: string;
  address_detail: string;
  address_province: string;
  address_city: string;
  address_district: string;
  address_village: string;
  address_postal_code: string;
  address_province_id: number;
  address_district_id: number;
  address_village_id: number;
  image_path_full: string;
}

interface AdminBranch {
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
}

interface AdminAccessMenu {
  name: string;
  actions: string[];
}

interface AdminRole {
  id: number;
  name: string;
  name_alias: string;
  access_menus: AdminAccessMenu[];
  guard_name: string;
  created_at: string;
  updated_at: string;
  is_active: number;
  description: string;
  pivot: {
    model_type: string;
    model_id: string;
    role_id: number;
  };
}

interface AdminUserProfile {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  is_otp_verified: boolean;
  is_default_password: boolean;
  mobile_number: string;
  type: 'SUPER_ADMIN' | 'ADMIN' | 'HEAD_TECH' | 'TECH';
  is_active: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string;
  profile: AdminProfileDetail;
  customer: unknown;
  branches: AdminBranch[];
  roles: AdminRole[];
}

export type AdminProfileDetailResponse = ApiResponse<{user: AdminUserProfile}>;

export type PasswordAdminPayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export type PasswordAdminResponse = ApiResponse<{
  user: AdminUserProfile;
}>;
