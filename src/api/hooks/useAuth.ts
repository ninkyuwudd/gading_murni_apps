import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {
  LoginPayloadType,
  LoginResponse,
  RegisterPayloadType,
  VerifyPayloadType,
  UserUpdatePasswordPayload,
  RegisterResponse,
  VerificationDataBody,
  VerificationResponse,
  VerifyResponse,
  ResetPasswordPayloadType,
  User,
  ChangePasswordPayloadType,
  ChangePasswordResponse,
} from '../../@types/auth';
import {
  changePassword,
  login,
  register,
  resetPassword,
  userUpdatePassword,
  verification,
  verify,
} from '../services/AuthServices';
import {getQueryKey} from '../../@types/query';

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginPayloadType
> =>
  useMutation({
    mutationKey: getQueryKey('login'),
    mutationFn: async (payload: LoginPayloadType) => login(payload),
  });

export const useRegister = (): UseMutationResult<
  RegisterResponse,
  Error,
  RegisterPayloadType
> =>
  useMutation({
    mutationKey: getQueryKey('register'),
    mutationFn: (payload: RegisterPayloadType) => register(payload),
  });

export const useUserUpdatePassword = (): UseMutationResult<
  LoginResponse,
  Error,
  UserUpdatePasswordPayload
> =>
  useMutation({
    mutationKey: getQueryKey('update-password'),
    mutationFn: (payload: UserUpdatePasswordPayload) =>
      userUpdatePassword(payload),
  });

export const useVerification = (): UseMutationResult<
  VerificationResponse,
  Error,
  VerificationDataBody
> =>
  useMutation({
    mutationKey: getQueryKey('verification'),
    mutationFn: (payload: VerificationDataBody) => verification(payload),
  });

export const useVerify = (): UseMutationResult<
  VerifyResponse,
  Error,
  VerifyPayloadType
> =>
  useMutation({
    mutationKey: getQueryKey('verify'),
    mutationFn: (payload: VerifyPayloadType) => verify(payload),
  });

export const useResetPassowrd = (): UseMutationResult<
  User,
  Error,
  ResetPasswordPayloadType
> =>
  useMutation({
    mutationKey: getQueryKey('reset-passowrd'),
    mutationFn: (payload: ResetPasswordPayloadType) => resetPassword(payload),
  });

export const useChangePassword = (): UseMutationResult<
  ChangePasswordResponse,
  Error,
  ChangePasswordPayloadType
> =>
  useMutation({
    mutationKey: getQueryKey('user-change-password'),
    mutationFn: (payload: ChangePasswordPayloadType) => changePassword(payload),
  });
