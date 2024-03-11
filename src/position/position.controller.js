import express from 'express';
import {
  createPosition,
  deletePosition,
  getAllPositions,
  updatePosition,
} from './position.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';

const router = express.Router();

router.get('/positions', async (req, res, next) => {
  try {
    const { id } = req.user;
    const positions = await getAllPositions(id);

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
