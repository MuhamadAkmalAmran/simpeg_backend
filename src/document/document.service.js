import ResponseError from '../utils/response-error.js';
import { createDocumentValidation, updateDocumentValidation } from '../validation/document-validation.js';
import validate from '../validation/validation.js';
import {
  deleteDocument,
  editDocument,
  findAllDocumentsByUser,
  findDocumentById,
  insertDocument,
} from './document.respository.js';
import uploadFile from '../utils/upload-file.js';

const getAllDocumentsByUser = async (userId) => {
  const documents = await findAllDocumentsByUser(userId);

  return documents;
};

const getDocumentById = async (id, userId) => {
  const document = await findDocumentById(id, userId);

  if (!document) {
    throw new ResponseError(404, 'Document not found.');
  }

  return document;
};

const createDocument = async (documentData, userId, file) => {
  const doucmentValidation = await validate(createDocumentValidation, documentData);

  const fileUrl = await uploadFile(file);
  // console.info(fileUrl);

  const document = await insertDocument({
    id: doucmentValidation.id,
    jenis_dokumen: doucmentValidation.jenis_dokumen,
    no_dokumen: doucmentValidation.no_dokumen,
    file_url: fileUrl.file_url,
  }, userId);

  return document;
};

const updateDocument = async (id, documentData, userId, file) => {
  const documentById = await getDocumentById(id);

  if (!documentById) {
    throw new ResponseError(404, 'Document not found.');
  }

  const doucmentValidation = await validate(updateDocumentValidation, documentData);

  const fileUrl = await uploadFile(file);

  const document = await editDocument(id, {
    id: doucmentValidation.id,
    jenis_dokumen: doucmentValidation.jenis_dokumen,
    no_dokumen: doucmentValidation.no_dokumen,
    file_url: fileUrl.file_url,
  }, userId);

  return document;
};

const deleteDocumentById = async (id, userId) => {
  const documentById = await getDocumentById(id);

  if (!documentById) {
    throw new ResponseError(404, 'Document not found.');
  }

  const document = await deleteDocument(id, userId);

  return document;
};

export {
  getAllDocumentsByUser,
  createDocument,
  updateDocument,
  deleteDocumentById,
};
