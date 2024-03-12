import express from 'express';
import {
  createTraining,
  deleteTrainingById,
  getAllTrainings, getAllTrainingsByUser, updateTraining,
  verifTraining,
} from './training.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

// admin role

router.get('/admin/trainings/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const trainigs = await getAllTrainings(id);

    res.status(200).json({
      status: false,
      trainigs,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/admin/trainings/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const trainingById = req.params.id;
    const trainingData = req.body;
    const trainigs = await verifTraining(trainingById, trainingData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: trainigs,
    });
  } catch (error) {
    next(error);
  }
});

// user role

router.get('/trainings', async (req, res, next) => {
  try {
    const { id } = req.user;
    const trainigs = await getAllTrainingsByUser(id);
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
