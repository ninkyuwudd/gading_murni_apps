import {
  ChangePasswordPayloadType,
  ChangePasswordResponse,
  LoginPayloadType,
  LoginResponse,
  RegisterPayloadType,
  RegisterResponse,
  ResetPasswordPayloadType,
  User,
  UserUpdatePasswordPayload,
  VerificationDataBody,
  VerificationResponse,
  VerifyPayloadType,
  VerifyResponse,
} from '../../@types/auth';
import ApiClient from '../ApiClient';

export const login = async (req: LoginPayloadType): Promise<LoginResponse> => {
  try {
    const response: LoginResponse = await ApiClient.post(
      '/api/v1/auth/login',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  req: RegisterPayloadType,
): Promise<RegisterResponse> => {
  try {
    const response: RegisterResponse = await ApiClient.post(
      '/api/v1/auth/register',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const userUpdatePassword = async (
  req: UserUpdatePasswordPayload,
): Promise<LoginResponse> => {
  try {
    const response: LoginResponse = await ApiClient.post(
      '/api/v1/auth/change-password',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const verification = async (
  req: VerificationDataBody,
): Promise<VerificationResponse> => {
  try {
    const response: VerificationResponse = await ApiClient.post(
      '/api/v1/auth/otp',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const verify = async (
  req: VerifyPayloadType,
): Promise<VerifyResponse> => {
  try {
    const response: VerifyResponse = await ApiClient.post(
      '/api/v1/auth/verify',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  req: ResetPasswordPayloadType,
): Promise<User> => {
  try {
    const response: User = await ApiClient.post(
      '/api/v1/auth/forgot-password',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  req: ChangePasswordPayloadType,
): Promise<ChangePasswordResponse> => {
  try {
    const response: ChangePasswordResponse = await ApiClient.post(
      '/api/v1/auth/reset-password',
      req,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
