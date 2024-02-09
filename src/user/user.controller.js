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
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const token = accessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
      message: 'Login successfull',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findOne({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       res.status(400).json({
//         status: {
//           code: 400,
//           error: true,
//         },
//         message: 'User not found',
//       });
//     }

//     const passworCompare = await bcrypt.compare(password, user.password);

//     if (!passworCompare) {
//       res.status(400).json({
//         status: {
//           code: 400,
//           error: true,
//         },
//         message: 'Invalid Password',
//       });
//     }

//     const payload = {
//       id: user.id,
//       email: user.email,
//     };
//     const token = accessToken(payload);
//     res.cookie('jwt');

//     res.status(200).json({
//       status: {
//         code: 200,
//         error: false,
//       },
//       data: {
//         email: user.email,
//         accesstoken: token,
//       },
//       message: 'Login Success',
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: {
//         code: 400,
//         error: true,
//       },
//       message: error.message,
//     });
//   }
// };

export default router;
