import path from 'path';
import salted from 'salted-md5';
import {
  getDownloadURL, getStorage, ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import ResponseError from './response-error.js';
import firebaseConfig from '../config/firebase-config.js';

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadFile = async (file) => {
  try {
    const name = salted(file.originalname, 'SUPER-S@LT!');
    const ext = name + path.extname(file.originalname);
    console.info(ext);

    const allowedExtensions = '.pdf';

    if (!ext.includes(allowedExtensions)) {
      throw new ResponseError(400, 'Hanya dapat menggunakan file .pdf');
    }

    const storageRef = ref(storage, `files/${ext}`);
    const metaData = {
      contentType: 'application/pdf',
    };
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metaData);

    const downloadUrl = await getDownloadURL(snapshot.ref);

    return {
      file_url: downloadUrl,
    };
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};

export default uploadFile;
