import express from 'express';
import { updateProfile, getAllProfiles } from './profile.service.js';

const router = express.Router();

router.get('/profiles', async (req, res, next) => {
  try {
    const { id } = req.user;
    const profiles = await getAllProfiles(id);
    res.status(200).json({
      error: false,
      profiles,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/profiles', async (req, res, next) => {
  try {
    const { id } = req.user;
    const profileData = req.body;
    const profile = await updateProfile(profileData, id);
    res.status(200).json({
      error: false,
      message: 'Profile updated',
      profile,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
