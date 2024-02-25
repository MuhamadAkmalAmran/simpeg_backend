import express from 'express';
import {
  createAchievement,
  deleteAchievementById,
  getAllAchievements,
  updateAchievement,
} from './achievement.service.js';

const router = express.Router();

router.get('/achievements', async (req, res, next) => {
  try {
    const { id } = req.user;
    const achievements = await getAllAchievements(id);
    res.status(200).json({
      error: false,
      achievements,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/achievements', async (req, res, next) => {
  try {
    const { id } = req.user;
    const achievementData = req.body;
    const achievement = await createAchievement(achievementData, id);
    res.status(201).json({
      error: false,
      message: 'Achievement created successfully.',
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/achievements/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const achievementById = req.params.id;
    const achievementData = req.body;
    const achievement = await updateAchievement(achievementById, achievementData, id);
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
