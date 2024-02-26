import ResponseError from '../utils/response-error.js';
import { createDocumentValidation } from '../validation/document-validation.js';
import validate from '../validation/validation.js';
import {
  deleteDocument,
  editDocument,
  findAllDocumentsByUser,
  findDocumentById,
  insertDocument,
} from './document.respository.js';

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

const createDocument = async (documentData, userId) => {
  const doucmentValidation = await validate(createDocumentValidation, documentData);

  const document = await insertDocument(doucmentValidation, userId);

  return document;
};

const updateDocument = async (id, documentData, userId) => {
  const documentById = getDocumentById(id);

  if (!documentById) {
    throw new ResponseError(404, 'Document not found.');
  }

  const document = await editDocument(id, documentData, userId);

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
