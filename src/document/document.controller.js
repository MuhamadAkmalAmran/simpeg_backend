import express from 'express';
import {
  createDocument,
  deleteDocumentById,
  getAllDocumentsByUser,
  updateDocument,
} from './document.service.js';

const router = express.Router();

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

router.post('/documents', async (req, res, next) => {
  try {
    const { id } = req.user;
    const doucmentData = req.body;
    const documents = await createDocument(doucmentData, id);
    res.status(201).json({
      error: false,
      messaage: 'Document successfully created',
      data: documents,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/documents/:id', async (req, res, next) => {
  try {
    const documentId = req.params.id;
    const documentData = req.body;
    const { id } = req.user;
    const document = await updateDocument(documentId, documentData, id);
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
