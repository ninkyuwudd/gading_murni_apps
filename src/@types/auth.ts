import {ApiResponse} from './apiResponse';

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export type LoginPayloadType = {
  username: string;
  password: string;
  device_token: string;
};

export interface Role {
  id: number;
  name: string;
  name_alias: string;
}

export interface User {
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
  role?: Role;
}

export interface LoginDataBody {
  token: string;
  token_type: string;
  otp_verified: boolean;
  user_type: string;
  user: User;
  verified_user?: Boolean;
}

export type LoginResponse = ApiResponse<LoginDataBody>;

export type RegisterPayloadType = {
  full_name: string;
  company_name: string;
  mobile_number: string;
  email: string;
  password: string;
};

export type RegisterDataBody = {
  token: string;
  token_type: string;
  otp_verified: boolean | null;
  user_type: string;
  user: {
    id: string;
    name: string;
    email: string;
    is_default_password: boolean;
    type: string;
    created_by: null | string;
    updated_by: null | string;
    updated_at: string;
    created_at: string;
    mobile_number: string;
  };
};

export type RegisterResponse = ApiResponse<RegisterDataBody>;

export type VerificationDataBody = {
  otp_type: string;
};

export type VerificationResponse = ApiResponse<{user: User}>;

export type VerifyPayloadType = {
  otp_token: string;
};

export type VerifyResponse = ApiResponse<User>;

export type UserUpdatePasswordPayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export type ResetPasswordPayloadType = {
  account: string;
  otp_type: string;
};

export type ChangePasswordPayloadType = {
  account: string;
  otp_type: string;
  otp: string;
  new_password: string;
  confirm_password: string;
};

export type ChangePasswordForm = {
  account: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

export type ChangePasswordResponse = ApiResponse<[]>;
