import {ImageAsset, UploadPhotoResponse} from '../../../@types/support';
import ApiClient from '../../ApiClient';

export const uploadPhoto = async (
  imageAsset: ImageAsset,
): Promise<UploadPhotoResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageAsset.uri,
      type: imageAsset.type || 'image/jpeg',
      name: imageAsset.name,
    });
    const response: UploadPhotoResponse = await ApiClient.post(
      '/api/v1/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  } catch (error) {
    console.log({error});
    throw error;
  }
};
