import bcrypt from 'bcrypt';
import prisma from '../db/database.js';

const findAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const insertUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      nama: userData.nama,
      username: userData.username,
      email: userData.email,
      password: hashPassword,
      img_url: userData.img_url,
    },
  });

  return user;
};

const findUserByUsername = async (username) => {
  const userEmail = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return userEmail;
};

export { findAllUsers, insertUser, findUserByUsername };
