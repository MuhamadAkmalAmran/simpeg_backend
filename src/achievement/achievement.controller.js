import express from 'express';
import {
  createAchievement,
  deleteAchievementById,
  getAllAchievements,
  getAllAchievementsByUser,
  updateAchievement,
  verifAchievement,
} from './achievement.service.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';

const router = express.Router();

// admin role
router.get('/achievements/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const achievements = await getAllAchievements(id);
    res.status(200).json({
      error: false,
      achievements,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/achievements/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    // const { role } = req.user;
    const id = req.params.userId;
    const achievementById = req.params.id;
    const achievementData = req.body;
    const achievement = await verifAchievement(achievementById, achievementData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
});

// user role
router.get('/achievements', async (req, res, next) => {
  try {
    const { id } = req.user;
    const achievements = await getAllAchievementsByUser(id);
    res.status(200).json({
      error: false,
      achievements,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/achievements', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const achievementData = req.body;
    const achieveFile = req.file;
    const achievement = await createAchievement(achievementData, id, achieveFile);
    res.status(201).json({
      error: false,
      message: 'Achievement created successfully.',
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/achievements/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const { id } = req.user;
    const achievementById = req.params.id;
    const achieveFile = req.file;
    const achievementData = req.body;
    const achievement = await updateAchievement(achievementById, achievementData, id, achieveFile);
    res.status(200).json({
      error: false,
      message: 'Achievement updated successfully.',
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/achievements/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const achievementById = req.params.id;
    await deleteAchievementById(achievementById, id);
    res.status(200).json({
      error: false,
      message: 'Achievement deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
