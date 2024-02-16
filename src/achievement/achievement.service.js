import {
  deleteAchievement,
  editAchievement,
  findAchievementById,
  findAllAchievements,
  insertAchievement,
} from './achievement.repository.js';

const getAllAchievements = async () => {
  const achievements = await findAllAchievements();
  return achievements;
};

const getAchievementById = async (id) => {
  const achievement = await findAchievementById(id);
  return achievement;
};

const createAchievement = async (achievementData) => {
  if (!achievementData.nama || !achievementData.tingkat
    || !achievementData.tahun || !achievementData.penyelenggara) {
    throw new Error('Fields are required');
  }
  const achievement = await insertAchievement(achievementData);
  return achievement;
};

const updateAchievement = async (id, achievementData) => {
  const achievementById = await findAchievementById(id);

  if (!achievementById) {
    throw new Error('Achievement not found.');
  }
  const achievement = await editAchievement(id, achievementData);
  return achievement;
};

const deleteAchievementById = async (id) => {
  const achievementById = await findAchievementById(id);

  if (!achievementById) {
    throw new Error('Achievement not found.');
  }
  const achievement = await deleteAchievement(id);
  return achievement;
};

export {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievementById,
};
