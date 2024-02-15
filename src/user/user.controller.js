import express from 'express';
import { getAllUsers, createUser, loginUser } from './user.service.js';
import accessToken from '../utils/jwt.js';

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json({
    data: users,
  });
});

router.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);

    res.status(201).json({
      data: user,
      message: 'User created successfull',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    const token = accessToken({
      nama: user.nama,
      username: user.username,
      email: user.email,
    });

    res.status(200).json({
      data: {
        nama: user.nama,
        username: user.username,
        email: user.email,
      },
      token,
      message: 'Login successfull',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
