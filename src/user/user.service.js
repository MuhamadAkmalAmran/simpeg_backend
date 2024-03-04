import bcrypt from 'bcrypt';
import {
  deleteToken,
  deleteUser,
  findAllUsers,
  findUserById,
  findUserByUsername, findUserCurrent, insertUser,
  updateTokenUserByUsername,
} from './user.repository.js';
import validate from '../validation/validation.js';
import {
  registerValidation,
  loginValidation,
  getUserValidation,
} from '../validation/user-validation.js';
import ResponseError from '../utils/response-error.js';

const getAllUsers = async () => {
  const users = await findAllUsers();

  return users;
};

const getUserByUsername = async (username) => {
  const user = await findUserCurrent(username);
  return user;
};

const getDetailUser = async (id) => {
  const userValidation = await validate(getUserValidation, id);
  const user = await findUserById(userValidation);
  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
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

  // const usernameValidation = await validate(getUserNameValidation, userData.username);
  const user = await findUserByUsername(userValidation.username);

  if (!user) {
    throw new ResponseError(401, 'User does not exist');
  }

  const comparePassword = await bcrypt.compare(userValidation.password, user.password);
  if (!comparePassword) {
    throw new ResponseError(401, 'Username or Password wrong.');
  }

  const updateToken = await updateTokenUserByUsername(user, user.username);

  return updateToken;
};

const logoutUser = async (username) => {
  const userValidation = await validate(getUserValidation, username);
  const user = await deleteToken(userValidation);

  return user;
};

const deleteUserById = async (id) => {
  const userValidation = await validate(getUserValidation, id);
  const userById = await findUserById(userValidation);
  if (!userById) {
    throw new ResponseError(404, 'User does not exist');
  }
  const user = await deleteUser(userValidation);

  return user;
};

export {
  getAllUsers,
  getDetailUser,
  createUser,
  loginUser,
  logoutUser,
  getUserByUsername,
  deleteUserById,
};
