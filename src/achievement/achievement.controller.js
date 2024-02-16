import express from 'express';
import {
  createAchievement,
  deleteAchievementById,
  getAllAchievements,
  updateAchievement,
} from './achievement.service.js';

const router = express.Router();

router.get('/achievements', async (req, res) => {
  const achievements = await getAllAchievements();
  res.status(200).json(achievements);
});

router.post('/achievements', async (req, res) => {
  try {
    const achievementData = req.body;
    const achievement = await createAchievement(achievementData);
    res.status(201).json({
      data: achievement,
      message: 'Achievement created successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.patch('/achievements/:id', async (req, res) => {
  try {
    const achievementById = req.params.id;
    const achievementData = req.body;
    const achievement = await updateAchievement(achievementById, achievementData);
    res.status(200).json({
      data: achievement,
      message: 'Achievement updated successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete('/achievements/:id', async (req, res) => {
  try {
    const achievementById = req.params.id;
    await deleteAchievementById(achievementById);
    res.status(200).json({
      message: 'Achievement deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
