import {ApiResponse} from './apiResponse';

export type ImageAsset = {
  uri: string;
  type?: string;
  name?: string;
};

export type UploadPhotoResponse = ApiResponse<{
  image_path: string;
  image_url: string;
}>;
