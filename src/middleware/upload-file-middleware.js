import multer from 'multer';
import ResponseError from '../utils/response-error.js';

const maxSize = 2 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSize,
  },
}).single('file');

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    throw new ResponseError(400, 'File size is too large. Maximum allowed size is 2 MB.');
  }

  next(err);
};

export {
  multerErrorHandler,
  upload,
};
