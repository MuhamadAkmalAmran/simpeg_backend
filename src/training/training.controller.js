import express from 'express';
import {
  createTraining,
  deleteTrainingById,
  getAllTrainings, updateTraining,
} from './training.service.js';

const router = express.Router();

router.get('/trainings', async (req, res) => {
  const trainigs = await getAllTrainings();
  res.status(200).json(trainigs);
});

router.post('/trainings', async (req, res) => {
  try {
    const trainingData = req.body;
    const training = await createTraining(trainingData);
    res.status(201).json({
      data: training,
      message: 'Training successfully created.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch('/trainings/:id', async (req, res) => {
  try {
    const trainingById = req.params.id;
    const trainingData = req.body;
    const training = await updateTraining(trainingById, trainingData);
    res.status(200).json({
      data: training,
      message: 'Training successfully updated.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete('/trainings/:id', async (req, res) => {
  try {
    const trainingById = req.params.id;

    await deleteTrainingById(trainingById);
    res.status(200).json({
      message: 'Training successfully deleted.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
