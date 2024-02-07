import { findAllUsers, findUserByEmail, insertUser } from './user.repository.js';

const getAllUsers = async () => {
  const users = await findAllUsers();

  return users;
};

const createUser = async (userData) => {
  const existingUserByEmail = await findUserByEmail(userData.email);
  if (existingUserByEmail) {
    throw new Error('Email is already exists');
  }

  if (userData.password.length < 8) {
    throw new Error('Password length should be more than 8 characters.');
  }

  const user = await insertUser(userData);

  return user;
};

export { getAllUsers, createUser };
