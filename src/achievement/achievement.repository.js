import prisma from '../db/database.js';

const findAllAchievements = async () => {
  const achievements = await prisma.achievement.findMany();
  return achievements;
};

const findAchievementById = async (id) => {
  const achievement = await prisma.achievement.findUnique({
    where: {
      id,
    },
  });
  return achievement;
};

const insertAchievement = async (achievementData) => {
  const achievement = await prisma.achievement.create({
    data: {
      nama: achievementData.nama,
      tingkat: achievementData.tingkat,
      tahun: achievementData.tahun,
      penyelenggara: achievementData.penyelenggara,
    },
  });
  return achievement;
};

const editAchievement = async (id, achievementData) => {
  const achievement = await prisma.achievement.update({
    where: {
      id,
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

const deleteAchievement = async (id) => {
  const achievement = await prisma.achievement.delete({
    where: {
      id,
    },
  });
  return achievement;
};

export {
  findAllAchievements,
  findAchievementById,
  insertAchievement,
  editAchievement,
  deleteAchievement,
};
