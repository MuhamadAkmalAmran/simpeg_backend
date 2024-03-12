import express from 'express';
import {
  createTitle,
  deleteTitleById,
  getAllTitles,
  getAllTitlesByUser,
  updateTitle,
  verifTitle,
} from './title.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

// admin role

router.get('/admin/titles/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const titles = await getAllTitles(id);

    res.status(200).json({
      status: false,
      titles,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/admin/titles/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const titleById = req.params.id;
    const titleData = req.body;
    const title = await verifTitle(titleById, titleData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: title,
    });
  } catch (error) {
    next(error);
  }
});

// user role

router.get('/titles', async (req, res, next) => {
  try {
    const { id } = req.user;
    const titles = await getAllTitlesByUser(id);
    res.status(200).json({
      status: false,
      titles,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/titles', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const titleData = req.body;
    const titleFile = req.file;
    const title = await createTitle(titleData, id, titleFile);
    res.status(201).json({
      status: false,
      message: 'Title created successfully.',
      data: title,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/titles/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const titleById = req.params.id;
    const titleData = req.body;
    const titleFile = req.file;
    const title = await updateTitle(titleById, titleData, id, titleFile);
    res.status(200).json({
      status: false,
      message: 'Title updated successfully.',
      data: title,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/titles/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const titleById = req.params.id;
    await deleteTitleById(titleById, id);
    res.status(200).json({
      status: false,
      message: 'Title deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
