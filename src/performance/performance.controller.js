import express from 'express';
import {
  createPerformance,
  deletePerformanceById,
  getAllPerformances,
  updatePerformance,
} from './performance.service.js';

const router = express.Router();

router.get('/performances', async (req, res) => {
  const performances = await getAllPerformances();
  res.status(200).json(performances);
});

router.post('/performances', async (req, res, next) => {
  try {
    const performanceData = req.body;
    const performance = await createPerformance(performanceData);
    res.status(201).json({
      data: performance,
      message: 'Performance successfully created.',
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/performances/:id', async (req, res, next) => {
  try {
    const performanceById = req.params.id;
    const performanceData = req.body;
    const performance = await updatePerformance(performanceById, performanceData);
    res.status(200).json({
      data: performance,
      message: 'Performance successfully updated.',
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/performances/:id', async (req, res, next) => {
  try {
    const performanceById = req.params.id;
    await deletePerformanceById(performanceById);
    res.status(200).json({
      message: 'Performance successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;