import express from 'express';
import {
  createPosition,
  deletePosition,
  getAllPositions,
  getAllPositionsByUser,
  updatePosition,
  verifPosition,
} from './position.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

// admin role

router.get('/admin/positions/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const positions = await getAllPositions(id);

    res.status(200).json({
      status: false,
      positions,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/admin/positions/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const positionById = req.params.id;
    const positionData = req.body;
    const position = await verifPosition(positionById, positionData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: position,
    });
  } catch (error) {
    next(error);
  }
});

// user role

router.get('/positions', async (req, res, next) => {
  try {
    const { id } = req.user;
    const positions = await getAllPositionsByUser(id);

    res.status(200).json({
      status: false,
      positions,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/positions', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const positionData = req.body;
    const posFile = req.file;
    const position = await createPosition(positionData, id, posFile);

    res.status(201).json({
      status: false,
      message: 'Position created successfully.',
      data: {
        position,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/positions/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const positionById = req.params.id;
    const positionData = req.body;
    const posFile = req.file;
    const position = await updatePosition(positionById, positionData, id, posFile);

    res.status(200).json({
      error: false,
      message: 'Position updated successfully.',
      data: position,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/positions/:id', async (req, res, next) => {
  try {
    const positionById = req.params.id;

    await deletePosition(positionById);

    res.status(200).json({
      message: 'Position deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
