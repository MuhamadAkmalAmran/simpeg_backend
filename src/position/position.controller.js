import express from 'express';
import { createPosition, getAllPositions, updatePosition } from './position.service.js';

const router = express.Router();

router.get('/positions', async (req, res) => {
  try {
    const positions = await getAllPositions();

    res.status(200).json(positions);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/positions', async (req, res) => {
  try {
    const familyData = req.body;
    const position = await createPosition(familyData);

    res.status(201).json({
      data: {
        position
      },
      message: 'Position created successfully.',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.patch('/positions/:id', async (req, res) => {
  try {
    const positionById = req.params.id;
    const positionData = req.body;
    const position = await updatePosition(positionById, positionData);

    res.status(200).json({
      data: position,
      message: 'Position updated successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;