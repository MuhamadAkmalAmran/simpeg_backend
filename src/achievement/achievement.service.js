import { findUserById } from '../user/user.repository.js';
import ResponseError from '../utils/response-error.js';
import {
  createAchievementValidation,
  getAchievementValidation,
  updateAchievementValidation,
} from '../validation/achievement-validation.js';
import validate from '../validation/validation.js';
import verifValidation from '../validation/verification-validation.js';
import {
  deleteAchievement,
  editAchievement,
  findAchievementById,
  findAllAchievements,
  findAllAchievementsByUser,
  insertAchievement,
  verificationAchievement,
} from './achievement.repository.js';

// admin role

const getAllAchievements = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const achievements = await findAllAchievements(userId);
  return achievements;
};

const verifAchievement = async (id, achievementData, userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const achievementById = await findAchievementById(id, userId);

  if (!achievementById) {
    throw new ResponseError(404, 'Achievement not found');
  }
  const achievVerifValidation = await validate(verifValidation, achievementData);

  const achievementVerif = await verificationAchievement(id, achievVerifValidation, userId);

  return achievementVerif;
};

// user role
const getAllAchievementsByUser = async (userId) => {
  const achievements = await findAllAchievementsByUser(userId);
  return achievements;
};

const getAchievementById = async (id, userId) => {
  const achievementValidation = await validate(getAchievementValidation, id);
  const achievement = await findAchievementById(achievementValidation, userId);

  if (!achievement) {
    throw new ResponseError(404, 'Achivement not found.');
  }

  return achievement;
};

const createAchievement = async (achievementData, userId) => {
  const achievementValidation = await validate(createAchievementValidation, achievementData);
  const achievement = await insertAchievement(achievementValidation, userId);
  return achievement;
};

const updateAchievement = async (id, achievementData, userId) => {
  const achievementValidation = await validate(updateAchievementValidation, achievementData);

  const achievementById = await getAchievementById(id, userId);

  if (!achievementById) {
    throw new ResponseError(404, 'Achievement not found.');
  }
  const achievement = await editAchievement(id, achievementValidation);
  return achievement;
};

const deleteAchievementById = async (id, userId) => {
  const achievementById = await getAchievementById(id, userId);

  if (!achievementById) {
    throw new ResponseError(404, 'Achievement not found.');
  }
  const achievement = await deleteAchievement(id, userId);
  return achievement;
};

export {
  getAllAchievements,
  getAllAchievementsByUser,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievementById,
  verifAchievement,
};
