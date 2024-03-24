import bcrypt from 'bcrypt';
import {
  deleteToken,
  deleteUser,
  editUser,
  editUserByAdmin,
  findAllUsers,
  findChart,
  findUserById,
  findUserByNIP,
  findUserCurrent,
  insertUser,
  updateTokenUserByNIP,
  userDashboard,
} from './user.repository.js';
import validate from '../validation/validation.js';
import {
  registerValidation,
  loginValidation,
  getUserValidation,
  filterValidation,
  upadateUserValidation,
  upadateByUserValidation,
} from '../validation/user-validation.js';
import ResponseError from '../utils/response-error.js';
import { uploadImage } from '../utils/upload-file.js';
import { ChartEducation } from '../education/education.repository.js';

const getAllUsers = async (userData) => {
  const searchValidation = await validate(filterValidation, userData);
  const users = await findAllUsers(searchValidation);

  return users;
};

const getUserByNIP = async (nip) => {
  const user = await findUserCurrent(nip);
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
  const existingUserByUsername = await findUserByNIP(userData.nip);
  if (existingUserByUsername) {
    throw new ResponseError(400, 'NIP is already exists.');
  }
  const userValidation = validate(registerValidation, userData);
  const user = await insertUser(userValidation);

  return user;
};

const loginUser = async (userData) => {
  const userValidation = await validate(loginValidation, userData);

  // const usernameValidation = await validate(getUserNameValidation, userData.username);
  const user = await findUserByNIP(userValidation.nip);

  if (!user) {
    throw new ResponseError(401, 'User does not exist');
  }

  const comparePassword = await bcrypt.compare(userValidation.password, user.password);
  if (!comparePassword) {
    throw new ResponseError(401, 'Username or Password wrong.');
  }

  const updateToken = await updateTokenUserByNIP(user, user.nip);

  return updateToken;
};

const logoutUser = async (nip) => {
  const userValidation = await validate(getUserValidation, nip);
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

const updateUser = async (id, userData, file) => {
  const userId = await validate(getUserValidation, id);
  const userById = await findUserById(userId);
  if (!userById) {
    throw new ResponseError(404, 'User does not exist');
  }

  const userValidation = await validate(upadateByUserValidation, userData);

  const imgUrl = await uploadImage(file);
  const user = await editUser(
    id,
    {
      id: userValidation.id,
      email: userValidation.email,
      img_url: imgUrl.img_url,
    },
  );
  return user;
};

const getUserDashboard = async (nip) => {
  const user = await userDashboard(nip);
  return user;
};

const getChart = async () => {
  const educationChart = await ChartEducation();
  const userChart = await findChart();
  return {
    userChart,
    educationChart,
  };
};

const updateUserByAdmin = async (id, userData) => {
  const userId = await validate(getUserValidation, id);

  const userById = await findUserById(userId);
  if (!userById) {
    throw new ResponseError(404, 'User not found');
  }

  const userValidation = await validate(upadateUserValidation, userData);

  const user = await editUserByAdmin(userId, userValidation);
  return user;
};

export {
  getAllUsers,
  getDetailUser,
  createUser,
  loginUser,
  logoutUser,
  getUserByNIP,
  deleteUserById,
  updateUser,
  getUserDashboard,
  getChart,
  updateUserByAdmin,
};
