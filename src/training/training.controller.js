import express from 'express';
import {
  createTraining,
  deleteTrainingById,
  getAllTrainings, updateTraining,
} from './training.service.js';

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

router.post('/trainings', async (req, res, next) => {
  try {
    const { id } = req.user;
    const trainingData = req.body;
    const training = await createTraining(trainingData, id);
    res.status(201).json({
      status: false,
      message: 'Training successfully created.',
      data: training,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/trainings/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const trainingById = req.params.id;
    const trainingData = req.body;
    const training = await updateTraining(trainingById, trainingData, id);
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
