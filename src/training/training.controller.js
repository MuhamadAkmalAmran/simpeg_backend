import express from 'express';
import {
  createTraining,
  deleteTrainingById,
  getAllTrainings, updateTraining,
} from './training.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';

const router = express.Router();

router.get('/trainings', async (req, res, next) => {
  try {
    const { id } = req.user;
    const trainigs = await getAllTrainings(id);
    res.status(200).json({
      status: false,
      trainigs,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/trainings', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const trainingData = req.body;
    const trainigFile = req.file;
    const training = await createTraining(trainingData, id, trainigFile);
    res.status(201).json({
      status: false,
      message: 'Training successfully created.',
      data: training,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/trainings/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const trainingById = req.params.id;
    const trainingData = req.body;
    const trainigFile = req.file;
    const training = await updateTraining(trainingById, trainingData, id, trainigFile);
    res.status(200).json({
      status: false,
      message: 'Training successfully updated.',
      data: training,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/trainings/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const trainingById = req.params.id;

    await deleteTrainingById(trainingById, id);
    res.status(200).json({
      status: false,
      message: 'Training successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
