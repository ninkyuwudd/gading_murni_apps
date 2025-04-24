import {useMutation} from '@tanstack/react-query';
import {uploadPhoto} from '../services/customers/SupportServices';
import {ImageAsset} from '../../@types/support';

export const useUploadPhoto = () =>
  useMutation({
    mutationKey: ['upload'],
    mutationFn: (file: ImageAsset) => uploadPhoto(file),
  });
