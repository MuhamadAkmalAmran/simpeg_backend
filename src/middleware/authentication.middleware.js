import jwt from 'jsonwebtoken';
import prisma from '../db/database.js';

const secret = process.env.ACCESS_TOKEN;

const accessToken = (userData) => jwt.sign(userData, secret, { expiresIn: '1h' });

const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(401).json({
      errors: 'Unauthorized',
    }).end();
  } else {
    const user = await prisma.user.findFirst({
      where: {
        token,
      },
    });
    if (!user) {
      res.status(401).json({
        errors: 'Unauthorized',
      }).end();
    } else {
      req.user = user;
      next();
    }
  }
};
const adminMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(401).json({
      errors: 'Unauthorized',
    }).end();
  } else {
    const user = await prisma.user.findFirst({
      where: {
        token,
        role: 'ADMIN',
      },
    });
    if (!user) {
      res.status(401).json({
        errors: 'Unauthorized',
      }).end();
    } else {
      req.user = user;
      next();
    }
  }
};

const verifyToken = (token) => jwt.verify(token, process.env.ACCESS_TOKEN);

export {
  accessToken,
  adminMiddleware,
  authMiddleware,
  verifyToken,
};
