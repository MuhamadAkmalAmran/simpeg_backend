import bcrypt from 'bcrypt';
import { findAllUsers, findUserByEmail, insertUser } from './user.repository.js';

const getAllUsers = async () => {
  const users = await findAllUsers();

  return users;
};

const createUser = async (userData) => {
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error('Name, email, and password are required.');
  }

  const existingUserByEmail = await findUserByEmail(userData.email);
  if (existingUserByEmail) {
    throw new Error('Email is already exists.');
  }

  if (userData.password.length < 8) {
    throw new Error('Password length should be more than 8 characters.');
  }

  const user = await insertUser(userData);

  return user;
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email, password);

  if (!user) {
    throw new Error('User not found.');
  }

  if (!user.password) {
    throw new Error('Password is invalid.');
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (comparePassword) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  throw new Error('Password is invalid.');
};

export { getAllUsers, createUser, loginUser };
