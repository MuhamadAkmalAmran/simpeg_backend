import express from 'express';
import {
  getAllUsers,
  createUser, loginUser,
  logoutUser,
  getUserByUsername,
} from './user.service.js';
import { authMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

router.get('/users', authMiddleware, async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json({
    data: users,
  });
});

router.get('/users/current', authMiddleware, async (req, res, next) => {
  try {
    const { username } = req.user;
    const user = await getUserByUsername(username);
    res.status(200).json({
      error: false,
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);

    res.status(201).json({
      status: false,
      message: 'User created successfull',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await loginUser(userData);

    res.status(200).json({
      status: false,
      message: 'Login successfull',
      token: user,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', authMiddleware, async (req, res, next) => {
  try {
    const { username } = req.user;
    await logoutUser(username);
    res.status(200).json({
      status: false,
      message: 'Logout successfull',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
