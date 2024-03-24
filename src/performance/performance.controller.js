import express from 'express';
import {
  createPerformance,
  deletePerformanceById,
  getAllPerformances,
  getAllPerformancesByUser,
  updatePerformance,
  verifPerformance,
} from './performance.service.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';

const router = express.Router();

// admin role

router.get('/performances/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const performances = await getAllPerformances(id);
    res.status(200).json({
      status: false,
      performances,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/performances/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const performanceById = req.params.id;
    const performanceData = req.body;
    const performance = await verifPerformance(performanceById, performanceData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: performance,
    });
  } catch (error) {
    next(error);
  }
});

// user role

router.get('/performances', async (req, res, next) => {
  try {
    const { id } = req.user;
    const performances = await getAllPerformancesByUser(id);
    res.status(200).json({
      status: false,
      performances,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/performances', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const performanceData = req.body;
    const performFile = req.file;
    const performance = await createPerformance(performanceData, id, performFile);
    res.status(201).json({
      status: false,
      message: 'Performance successfully created.',
      data: performance,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/performances/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const performanceById = req.params.id;
    const performanceData = req.body;
    const performFile = req.file;
    const performance = await updatePerformance(performanceById, performanceData, performFile);
    res.status(200).json({
      error: false,
      message: 'Performance successfully updated.',
      data: performance,
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
      error: false,
      message: 'Performance successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
