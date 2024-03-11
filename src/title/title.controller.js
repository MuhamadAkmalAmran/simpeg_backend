import express from 'express';
import {
  createTitle,
  deleteTitleById,
  getAllTitles,
  updateTitle,
} from './title.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';

const router = express.Router();

router.get('/titles', async (req, res, next) => {
  try {
    const { id } = req.user;
    const titles = await getAllTitles(id);
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
