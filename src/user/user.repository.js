import bcrypt from 'bcrypt';
import prisma from '../db/database.js';
import accessToken from '../utils/jwt.js';

const findAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      img_url: true,
    },
  });

  return users;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const insertUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      nama: userData.nama,
      username: userData.username,
      email: userData.email,
      password: hashPassword,
      // role: userData.role,
      img_url: userData.img_url,
      profile: {
        create: {
          user_id: userData.id,
        },
      },
    },
  });

  return user;
};

const findUserCurrent = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      email: true,
      role: true,
    },
  });

  return user;
};

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

const updateTokenUserByUsername = async (userData, username) => {
  const token = accessToken({
    id: userData.id,
    username: userData.username,
    role: userData.role,
  });
  const user = await prisma.user.update({
    where: {
      username,
    },
    data: {
      token,
    },
    select: {
      token: true,
    },
  });

  return user;
};

const deleteToken = async (username) => {
  const user = await prisma.user.update({
    where: {
      username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
  return user;
};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export {
  findAllUsers,
  findUserById,
  findUserByUsername,
  insertUser,
  findUserCurrent,
  updateTokenUserByUsername,
  deleteToken,
  deleteUser,
};
