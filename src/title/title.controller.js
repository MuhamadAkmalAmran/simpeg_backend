import express from 'express';
import {
  createTitle,
  deleteTitleById,
  getAllTitles,
  updateTitle,
} from './title.service.js';

const router = express.Router();

router.get('/titles', async (req, res) => {
  const titles = await getAllTitles();

  res.status(200).json(titles);
});

router.post('/titles', async (req, res) => {
  try {
    const titleData = req.body;
    const title = await createTitle(titleData);
    res.status(201).json({
      data: title,
      message: 'Title created successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch('/titles/:id', async (req, res) => {
  try {
    const titleById = req.params.id;
    const titleData = req.body;
    const title = await updateTitle(titleById, titleData);
    res.status(200).json({
      data: title,
      message: 'Title updated successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete('/titles/:id', async (req, res) => {
  try {
    const titleById = req.params.id;
    await deleteTitleById(titleById);
    res.status(200).json({
      message: 'Title deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
