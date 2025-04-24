import {ApiResponse} from './apiResponse';

export interface ILocation {
  latitude?: number;
  longitude?: number;
}

export type ProvinceParams = {
  name?: string;
  page?: number;
  limit?: number;
};

export interface Province {
  code: string;
  province: string;
}

interface ProvincesPaginated {
  data: Province[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
}

export type ProvincesResponse = ApiResponse<{
  provinces_paginated: ProvincesPaginated;
}>;

export type ProvincesDetailResponse = ApiResponse<{
  province: Province;
}>;

export type RegenciesParams = {
  name: string;
  provinceCode: string;
  page?: number;
  limit?: number;
};

export interface RegenciesPaginated {
  data: Regency[];
  meta: PaginationMeta;
}

export interface Regency {
  code: string;
  province: string;
  regency: string;
  type: string;
}

export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
}

export type RegenciesResponse = ApiResponse<{
  regencies_paginated: RegenciesPaginated;
}>;

export type RegenciesDetailResponse = ApiResponse<{
  regency: Regency;
}>;

export type DistrictsParams = {
  name: string;
  regencyCode: string;
  page?: number;
  limit?: number;
};

export interface DistrictsPaginated {
  data: District[];
  meta: PaginationMeta;
}

export interface District {
  code: string;
  regency: string;
  district: string;
}

export type DistrictsResponse = ApiResponse<{
  districts_paginated: DistrictsPaginated;
}>;

export type DistrictsDetailResponse = ApiResponse<{
  district: District;
}>;

export type VillagesParams = {
  name: string;
  districtCode: string;
  page?: number;
  limit?: number;
};

export interface VillagesPaginated {
  data: Village[];
  meta: PaginationMeta;
}

export interface Village {
  code: string;
  district: string;
  village: string;
  postalCode: string;
}

export type VillagesResponse = ApiResponse<{
  villages_paginated: VillagesPaginated;
}>;

export type VillagesDetailResponse = ApiResponse<{
  village: Village;
}>;

export type BranchesParams = {
  city_id?: string;
  city?: string;
};

export interface Branch {
  id: string;
  name: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export type BranchesResponse = ApiResponse<{
  branches: Branch[];
}>;

export type LocationForm = {
  province: Province;
  regency: Regency;
  district: District;
  village: Village;
  postalCode: string;
  fullAddress: string;
  nearestBranch: Branch;
  longlat?: ILocation;
};
