import express from 'express';
import {
  createDocument,
  deleteDocumentById,
  getAllDocuments,
  getAllDocumentsByUser,
  updateDocument,
  verifDocument,
} from './document.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

// admin role

router.get('/documents/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const documents = await getAllDocuments(id);
    res.status(200).json({
      error: false,
      documents,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/documents/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const documentById = req.params.id;
    const documentData = req.body;
    const document = await verifDocument(documentById, documentData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: document,
    });
  } catch (error) {
    next(error);
  }
});

// user role
router.get('/documents', async (req, res, next) => {
  try {
    const { id } = req.user;
    const documents = await getAllDocumentsByUser(id);
    res.status(200).json({
      error: false,
      documents,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/documents', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const doucmentData = req.body;
    const docFile = req.file;
    const documents = await createDocument(doucmentData, id, docFile);
    res.status(201).json({
      error: false,
      messaage: 'Document successfully created',
      data: documents,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/documents/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const documentId = req.params.id;
    const documentData = req.body;
    const { id } = req.user;
    const docFile = req.file;
    const document = await updateDocument(documentId, documentData, id, docFile);
    res.status(200).json({
      error: false,
      messaage: 'Document successfully updated',
      data: document,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/documents/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const documentId = req.params.id;
    await deleteDocumentById(documentId, id);
    res.status(200).json({
      error: false,
      messaage: 'Document successfully deleted',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
