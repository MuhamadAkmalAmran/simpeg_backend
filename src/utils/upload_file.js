import { v2 as cloudinary } from 'cloudinary';

const uploadFile = cloudinary.config({
  cloud_name: 'dizg9eumc',
  api_key: '516299655728437',
  api_secret: '***************************',
});

export default uploadFile;
