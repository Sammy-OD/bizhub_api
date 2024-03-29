import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dwq0r21lh',
      api_key: '658488123946216',
      api_secret: 'cIWe2UbhQmGgQ-DdmeeTLGBMA7U'
    });
  },
};