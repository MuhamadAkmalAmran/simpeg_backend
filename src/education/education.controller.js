import express from 'express';
import {
  createEducation,
  deleteEducationById,
  getAllEducation,
  updateEducation,
} from './education.service.js';

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

router.post('/educations', async (req, res, next) => {
  try {
    const { id } = req.user;
    const educationData = req.body;
    const education = await createEducation(educationData, id);
    res.status(201).json({
      status: false,
      message: 'Education created successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/educations/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const educationById = req.params.id;
    const educationData = req.body;
    const education = await updateEducation(educationById, educationData, id);

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
