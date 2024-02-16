import express from 'express';
import {
  createEducation,
  deleteEducationById,
  getAllEducation,
  updateEducation,
} from './education.service.js';

const router = express.Router();

router.get('/educations', async (req, res) => {
  const educations = await getAllEducation();

  res.status(200).json(educations);
});

router.post('/educations', async (req, res) => {
  try {
    const educationData = req.body;
    const education = await createEducation(educationData);
    res.status(201).json({
      data: education,
      message: 'Education created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch('/educations/:id', async (req, res) => {
  try {
    const educationById = req.params.id;
    const educationData = req.body;
    const education = await updateEducation(educationById, educationData);

    res.status(200).json({
      data: education,
      message: 'Education updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete('/educations/:id', async (req, res) => {
  try {
    const educationById = req.params.id;

    await deleteEducationById(educationById);
    res.status(200).json({
      message: 'Education deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
