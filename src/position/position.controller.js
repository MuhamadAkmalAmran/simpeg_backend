import express from 'express';
import {
  createPosition,
  deletePosition,
  getAllPositions,
  updatePosition,
} from './position.service.js';

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

router.post('/positions', async (req, res, next) => {
  try {
    const { id } = req.user;
    const familyData = req.body;
    const position = await createPosition(familyData, id);

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

router.patch('/positions/:id', async (req, res, next) => {
  try {
    const positionById = req.params.id;
    const positionData = req.body;
    const position = await updatePosition(positionById, positionData);

    res.status(200).json({
      data: position,
      message: 'Position updated successfully.',
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
