import express from 'express';
import {
  createEducation,
  deleteEducationById,
  getAllEducation,
  getAllEducationByUser,
  updateEducation,
  verifEducation,
} from './education.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

// admin role

router.get('/admin/educations/:userId', adminMiddleware, async (req, res, next) => {
  try {
    // const { id } = req.user;
    const id = req.params.userId;
    const educations = await getAllEducation(id);
    res.status(200).json({
      status: false,
      educations,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/admin/educations/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    // const { role } = req.user;
    const id = req.params.userId;
    const educationById = req.params.id;
    const educationData = req.body;
    const education = await verifEducation(educationById, educationData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: education,
    });
  } catch (error) {
    next(error);
  }
});

// user role
router.get('/educations', async (req, res, next) => {
  try {
    const { id } = req.user;
    const educations = await getAllEducationByUser(id);
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
