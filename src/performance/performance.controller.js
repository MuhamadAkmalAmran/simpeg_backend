import express from 'express';
import {
  createPerformance,
  deletePerformanceById,
  getAllPerformances,
  updatePerformance,
} from './performance.service.js';

const router = express.Router();

router.get('/performances', async (req, res, next) => {
  try {
    const { id } = req.user;
    const performances = await getAllPerformances(id);
    res.status(200).json({
      status: false,
      performances,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/performances', async (req, res, next) => {
  try {
    const { id } = req.user;
    const performanceData = req.body;
    const performance = await createPerformance(performanceData, id);
    res.status(201).json({
      status: false,
      message: 'Performance successfully created.',
      data: performance,
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
