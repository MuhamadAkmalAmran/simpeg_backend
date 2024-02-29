import bcrypt from 'bcrypt';
import {
  deleteToken,
  findAllUsers,
  findUserByUsername, insertUser,
  updateTokenUserByUsername,
} from './user.repository.js';
import validate from '../validation/validation.js';
import { registerValidation, loginValidation, getUserNameValidation } from '../validation/user-validation.js';
import ResponseError from '../utils/response-error.js';

const getAllUsers = async () => {
  const users = await findAllUsers();

  return users;
};

const getUserByUsername = async (username) => {
  const user = await findUserByUsername(username);
  return user;
};

const createUser = async (userData) => {
  const existingUserByUsername = await findUserByUsername(userData.username);
  if (existingUserByUsername) {
    throw new ResponseError(400, 'Username is already exists.');
  }
  const userValidation = validate(registerValidation, userData);
  const user = await insertUser(userValidation);

  return user;
};

const loginUser = async (userData) => {
  const userValidation = await validate(loginValidation, userData);
  const user = await findUserByUsername(userValidation);

  if (!user) {
    throw new ResponseError(401, 'User does not exist');
  }

  const comparePassword = await bcrypt.compare(userValidation.password, user.password);
  if (!comparePassword) {
    throw new ResponseError(401, 'Username or Password wrong.');
  }

  const updateToken = await updateTokenUserByUsername(user, userValidation.username);

  return updateToken;
};

const logoutUser = async (username) => {
  const userValidation = await validate(getUserNameValidation, username);
  const user = await deleteToken(userValidation);

  return user;
};

export {
  getAllUsers,
  createUser,
  loginUser,
  logoutUser,
  getUserByUsername,
};
