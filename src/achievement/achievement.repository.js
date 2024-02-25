import prisma from '../db/database.js';

const findAllAchievementsByUser = async (userId) => {
  const achievements = await prisma.achievement.findMany({
    where: {
      user_id: userId,
    },
  });
  return achievements;
};

const findAchievementById = async (id, userId) => {
  const achievement = await prisma.achievement.findUnique({
    where: {
      id,
      user_id: userId,
    },
  });
  return achievement;
};

const insertAchievement = async (achievementData, userId) => {
  const achievement = await prisma.achievement.create({
    data: {
      nama: achievementData.nama,
      tingkat: achievementData.tingkat,
      tahun: achievementData.tahun,
      penyelenggara: achievementData.penyelenggara,
      user_id: userId,
    },
  });
  return achievement;
};

const editAchievement = async (id, achievementData, userId) => {
  const achievement = await prisma.achievement.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      nama: achievementData.nama,
      tingkat: achievementData.tingkat,
      tahun: achievementData.tahun,
      penyelenggara: achievementData.penyelenggara,
    },
  });
  return achievement;
};

const deleteAchievement = async (id, userId) => {
  const achievement = await prisma.achievement.delete({
    where: {
      id,
      user_id: userId,
    },
  });
  return achievement;
};

export {
  findAllAchievementsByUser,
  findAchievementById,
  insertAchievement,
  editAchievement,
  deleteAchievement,
};
