import express from 'express';
import {
  createTitle,
  deleteTitleById,
  getAllTitles,
  updateTitle,
} from './title.service.js';

const router = express.Router();

router.get('/titles', async (req, res, next) => {
  try {
    const { id } = req.user;
    const titles = await getAllTitles(id);
    res.status(200).json({
      status: false,
      titles,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/titles', async (req, res) => {
  try {
    const { id } = req.user;
    const titleData = req.body;
    const title = await createTitle(titleData, id);
    res.status(201).json({
      status: false,
      message: 'Title created successfully.',
      data: title,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch('/titles/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const titleById = req.params.id;
    const titleData = req.body;
    const title = await updateTitle(titleById, titleData, id);
    res.status(200).json({
      status: false,
      message: 'Title updated successfully.',
      data: title,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/titles/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const titleById = req.params.id;
    await deleteTitleById(titleById, id);
    res.status(200).json({
      status: false,
      message: 'Title deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
