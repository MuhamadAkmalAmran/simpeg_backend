import express from 'express';
import {
  createEducation,
  deleteEducationById,
  getAllEducation,
  updateEducation,
} from './education.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';

const router = express.Router();

router.get('/educations', async (req, res, next) => {
  try {
    const { id } = req.user;
    const educations = await getAllEducation(id);
    res.status(200).json({
      status: false,
      educations,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/educations', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const educationData = req.body;
    const educFile = req.file;
    const education = await createEducation(educationData, id, educFile);
    res.status(201).json({
      status: false,
      message: 'Education created successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/educations/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const educationById = req.params.id;
    const educationData = req.body;
    const educFile = req.file;
    const education = await updateEducation(educationById, educationData, id, educFile);

    res.status(200).json({
      status: false,
      message: 'Education updated successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/educations/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const educationById = req.params.id;

    await deleteEducationById(educationById, id);
    res.status(200).json({
      status: false,
      message: 'Education deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
