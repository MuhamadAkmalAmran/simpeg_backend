import bcrypt from 'bcrypt';
import { findAllUsers, findUserByUsername, insertUser } from './user.repository.js';

const getAllUsers = async () => {
  const users = await findAllUsers();

  return users;
};

const createUser = async (userData) => {
  if (!userData.nama || !userData.username || !userData.email || !userData.password) {
    throw new Error('Nama, username, email, and password are required.');
  }

  const existingUserByUsername = await findUserByUsername(userData.username);
  if (existingUserByUsername) {
    throw new Error('Username is already exists.');
  }

  if (userData.password.length < 8) {
    throw new Error('Password length should be more than 8 characters.');
  }

  const user = await insertUser(userData);

  return user;
};

const loginUser = async (username, password) => {
  const user = await findUserByUsername(username, password);

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
      nama: user.nama,
      username: user.username,
      email: user.email,
    };
  }
  throw new Error('Password is invalid.');
};

export { getAllUsers, createUser, loginUser };
