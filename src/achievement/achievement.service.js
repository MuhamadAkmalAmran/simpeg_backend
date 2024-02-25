import ResponseError from '../utils/response-error.js';
import {
  createAchievementValidation,
  getAchievementValidation,
  updateAchievementValidation,
} from '../validation/achievement-validation.js';
import validate from '../validation/validation.js';
import {
  deleteAchievement,
  editAchievement,
  findAchievementById,
  findAllAchievementsByUser,
  insertAchievement,
} from './achievement.repository.js';

const getAllAchievements = async (userId) => {
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
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievementById,
};
