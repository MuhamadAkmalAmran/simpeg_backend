import express from 'express';
import {
  getAllUsers,
  createUser, loginUser,
  logoutUser,
  getUserByNIP,
  deleteUserById,
  getDetailUser,
  updateUser,
  getUserDashboard,
} from './user.service.js';
import { multerErrorHandler, upload } from '../middleware/upload-file-middleware.js';
import { adminMiddleware, authMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

router.get('/users', adminMiddleware, async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json({
    data: users,
  });
});

router.get('/users/current', authMiddleware, async (req, res, next) => {
  try {
    const { nip } = req.user;
    const user = await getUserByNIP(nip);
    res.status(200).json({
      error: false,
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users/navbar', authMiddleware, async (req, res, next) => {
  try {
    const { nip } = req.user;
    const user = await getUserByNIP(nip);
    res.status(200).json({
      error: false,
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users/dashboard', authMiddleware, async (req, res, next) => {
  try {
    const { nip } = req.user;
    const user = await getUserDashboard(nip);
    res.status(200).json({
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/users/:id', adminMiddleware, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getDetailUser(userId);
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
    // res.cookie('token', user.token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 });

    res.status(200).json({
      status: false,
      message: 'Login successfull',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', authMiddleware, async (req, res, next) => {
  try {
    const { nip } = req.user;
    await logoutUser(nip);
    res.status(200).json({
      status: false,
      message: 'Logout successfull',
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    await deleteUserById(userId);
    res.status(200).json({
      error: false,
      message: 'User deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/users/:id', upload, multerErrorHandler, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const userImg = req.file;
    const user = await updateUser(userId, userData, userImg);
    res.status(200).json({
      error: false,
      message: 'User updated',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
