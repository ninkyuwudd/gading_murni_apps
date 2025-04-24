import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  NavigationState,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {MasterMachine} from './masterMachine';
import {RegisterDataBody} from './auth';

export type RootNavigatorParamList = {
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthStackNavigatorParamList> | undefined;
  CustomerHome:
    | NavigatorScreenParams<CustomerBottomTabNavigatorParamList>
    | undefined;
  TechnicianHome:
    | NavigatorScreenParams<TechnicianBottomTabNavigatorParamList>
    | undefined;
  Machine: NavigatorScreenParams<MachineStackNavigatorParamList> | undefined;
};

export type OnboardingNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'Onboarding'
>;

export type AuthStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: {otpType: string};
  Otp: {otpType: string; data: RegisterDataBody | undefined};
  AccountCreated: undefined;
  ResetPassword: {otp_type: string; account: string};
  VerificationMethod: {
    toResetPassword: boolean;
    data?: RegisterDataBody | undefined;
  };
};

export type LoginNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Login'
>;

export type RegisterNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Register'
>;

export type OtpRouteProp = RouteProp<AuthStackNavigatorParamList, 'Otp'>;
export type OtpNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Otp'
>;

export type OtpScreenProps = {
  navigation: OtpNavigationProp;
  route: OtpRouteProp;
};

export type AccountCreatedNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'AccountCreated'
>;

export type ForgetPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'ForgetPassword'
>;

export type ForgetPasswordRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  'ForgetPassword'
>;

export type ForgetPasswordScreenProps = {
  navigation: ForgetPasswordNavigationProp;
  route: ForgetPasswordRouteProp;
};

export type ResetPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'ResetPassword'
>;

export type ResetPasswordRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  'ResetPassword'
>;

export type ResetPasswordScreenProps = {
  navigation: ResetPasswordNavigationProp;
  route: ResetPasswordRouteProp;
};

export type VerificationMethodNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'VerificationMethod'
>;

export type VerificationMethodScreenProps = {
  navigation: VerificationMethodNavigationProp;
  route: VerificationMethodRouteProp;
};

export type VerificationMethodRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  'VerificationMethod'
>;

export type CustomerBottomTabNavigatorParamList = {
  DashboardTab: undefined;
  BookingTab: NavigatorScreenParams<BookingStackNavigatorParamList> | undefined;
  ServiceTab: NavigatorScreenParams<ServiceStackNavigatorParamList> | undefined;
  ChatTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackNavigatorParamList> | undefined;
};

export type CustomerScreenType = RouteProp<
  RootNavigatorParamList,
  'CustomerHome'
>;

export type DashboardStackNavigatorParamList = {
  Dashboard: undefined;
};

export type DashboardNavigationProp = NativeStackNavigationProp<
  DashboardStackNavigatorParamList,
  'Dashboard'
>;

export type BookingStackNavigatorParamList = {
  Booking: undefined;
  BookingDetail: {
    bookingId?: string;
    resetState?: NavigationState | undefined;
  };
};

export type BookingNavigationProp = NativeStackNavigationProp<
  BookingStackNavigatorParamList,
  'Booking'
>;

export type BookingDetailNavigationProp = NativeStackNavigationProp<
  BookingStackNavigatorParamList,
  'BookingDetail'
>;

export type BookingDetailRouteProp = RouteProp<
  BookingStackNavigatorParamList,
  'BookingDetail'
>;

export type BookingDetailScreenProps = {
  navigation: BookingDetailNavigationProp;
  route: BookingDetailRouteProp;
};

export type ServiceStackNavigatorParamList = {
  Service: undefined;
  SubmitServiceSchedule: {machineId: string};
  ServiceRequestCreated: {bookingId: string};
  ServiceDetail: {
    serviceId: string;
    resetState?: NavigationState | undefined;
  };
  ServiceRating: {serviceId: string};
  ServiceReview: {
    serviceId: string;
    navigateScreen?: CustomerScreenType | undefined;
    resetState?: NavigationState | undefined;
  };
};

export type ServiceNavigationProp = NativeStackNavigationProp<
  ServiceStackNavigatorParamList,
  'Service'
>;

export type ServiceCardNavigationProp = NativeStackNavigationProp<
  CustomerBottomTabNavigatorParamList,
  'DashboardTab'
>;

export type SubmitServiceScheduleNavigationProp = NativeStackNavigationProp<
  ServiceStackNavigatorParamList,
  'SubmitServiceSchedule'
>;

export type SubmitServiceScheduleRouteProp = RouteProp<
  ServiceStackNavigatorParamList,
  'SubmitServiceSchedule'
>;

export type SubmitServiceScheduleScreenProps = {
  navigation: SubmitServiceScheduleNavigationProp;
  route: SubmitServiceScheduleRouteProp;
};

export type ServiceDetailNavigationProp = NativeStackNavigationProp<
  ServiceStackNavigatorParamList,
  'ServiceDetail'
>;

export type ServiceDetailRouteProp = RouteProp<
  ServiceStackNavigatorParamList,
  'ServiceDetail'
>;

export type ServiceDetailScreenProps = {
  navigation: ServiceDetailNavigationProp;
  route: ServiceDetailRouteProp;
};

export type ServiceRatingNavigationProp = NativeStackNavigationProp<
  ServiceStackNavigatorParamList,
  'ServiceRating'
>;

export type ServiceRatingRouteProp = RouteProp<
  ServiceStackNavigatorParamList,
  'ServiceRating'
>;

export type ServiceRatingScreenProps = {
  navigation: ServiceRatingNavigationProp;
  route: ServiceRatingRouteProp;
};

export type ServiceRequestCreatedNavigationProp = NativeStackNavigationProp<
  ServiceStackNavigatorParamList,
  'ServiceRequestCreated'
>;

export type ServiceRequestCreatedRouteProp = RouteProp<
  ServiceStackNavigatorParamList,
  'ServiceRequestCreated'
>;

export type ServiceRequestCreatedScreenProps = {
  navigation: ServiceRequestCreatedNavigationProp;
  route: ServiceRequestCreatedRouteProp;
};

export type ServiceReviewNavigationProp = NativeStackNavigationProp<
  ServiceStackNavigatorParamList,
  'ServiceReview'
>;

export type ServiceReviewRouteProp = RouteProp<
  ServiceStackNavigatorParamList,
  'ServiceReview'
>;

export type ServiceReviewScreenProps = {
  navigation: ServiceReviewNavigationProp;
  route: ServiceReviewRouteProp;
};

export type ProfileStackNavigatorParamList = {
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Setting: undefined;
  AboutUs: undefined;
  Location:
    | {
        resetState?: NavigationState | undefined;
      }
    | undefined;
};

export type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'Profile'
>;

export type EditProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'EditProfile'
>;

export type ChangePasswordNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'ChangePassword'
>;

export type LocationNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'Location'
>;

export type LocationRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'Location'
>;

export type LocationScreenProps = {
  navigation: LocationNavigationProp;
  route: LocationRouteProp;
};

export type TechnicianBottomTabNavigatorParamList = {
  DashboardTab: undefined;
  BookingTab:
    | NavigatorScreenParams<TechnicianBookingStackNavigatorParamList>
    | undefined;
  ServiceTab: undefined;
  ChatTab: undefined;
  NotificationsTab: undefined;
  ProfileTab:
    | NavigatorScreenParams<TechnicianProfileStackNavigatorParamList>
    | undefined;
};

export type TechnicianProfileStackNavigatorParamList = {
  EditProfile: undefined;
  ChangePassword: undefined;
  Profile: undefined;
  Setting: undefined;
  AboutUs: undefined;
};

export type TechnicianProfileNavigationProp = NativeStackNavigationProp<
  TechnicianProfileStackNavigatorParamList,
  'Profile'
>;

export type TechnicianBookingStackNavigatorParamList = {
  Booking: undefined;
  BookingDetail: {
    bookingId: string;
    bookingCode: string;
    resetState?: NavigationState | undefined;
  };
  EditCustomerData: {bookingId: string; disableEdit?: boolean};
};

export type TechnicianBookingNavigationProp = NativeStackNavigationProp<
  TechnicianBookingStackNavigatorParamList,
  'Booking'
>;

export type TechnicianBookingDetailNavigationProp = NativeStackNavigationProp<
  TechnicianBookingStackNavigatorParamList,
  'BookingDetail'
>;

export type TechnicianBookingDetailRouteProp = RouteProp<
  TechnicianBookingStackNavigatorParamList,
  'BookingDetail'
>;

export type TechnicianBookingDetailScreenProps = {
  navigation: TechnicianBookingDetailNavigationProp;
  route: TechnicianBookingDetailRouteProp;
};
export type TechnicianEditCustomerDataNavigationProp =
  NativeStackNavigationProp<
    TechnicianBookingStackNavigatorParamList,
    'EditCustomerData'
  >;

export type TechnicianEditCustomerDataRouteProp = RouteProp<
  TechnicianBookingStackNavigatorParamList,
  'EditCustomerData'
>;

export type TechnicianEditCustomerDataScreenProps = {
  navigation: TechnicianEditCustomerDataNavigationProp;
  route: TechnicianEditCustomerDataRouteProp;
};

export type MachineStackNavigatorParamList = {
  AddMachine:
    | {
        master_machine?: MasterMachine;
        serial_number?: string;
        purchased_date?: string;
        id?: string | null;
      }
    | undefined;
};

export type AddMachineNavigationProp = NativeStackNavigationProp<
  MachineStackNavigatorParamList,
  'AddMachine'
>;

export type AddMachineRouteProp = RouteProp<
  MachineStackNavigatorParamList,
  'AddMachine'
>;

export type AddMachineScreenProps = {
  navigation: AddMachineNavigationProp;
  route: AddMachineRouteProp;
};

export type MachineCardNavigationProp = NativeStackNavigationProp<
  MachineStackNavigatorParamList,
  'AddMachine'
>;

export type NotificationsStackNavigatorParamList = {
  Notifications: undefined;
};

export type NotificationsNavigationProp = NativeStackNavigationProp<
  NotificationsStackNavigatorParamList,
  'Notifications'
>;
