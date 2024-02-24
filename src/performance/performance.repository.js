import prisma from '../db/database.js';

const findAllPerformancesByUser = async (userId) => {
  const performances = await prisma.performance.findMany({
    where: {
      user_id: userId,
    },
  });
  return performances;
};

const findPerformanceById = async (id, userId) => {
  const performance = await prisma.performance.findUnique({
    where: {
      id,
      user_id: userId,
    },
  });
  return performance;
};

const insertPerformance = async (performanceData, userId) => {
  const performance = await prisma.performance.create({
    data: {
      nilai_kerja: performanceData.nilai_kerja,
      predikat: performanceData.predikat,
      user_id: userId,
    },
  });
  return performance;
};

const editPerformance = async (id, performanceData, userId) => {
  const performance = await prisma.performance.update({
    where: {
      id,
      userId,
    },
    data: {
      nilai_kerja: performanceData.nilai_kerja,
      predikat: performanceData.predikat,
    },
  });
  return performance;
};

const deletePerformance = async (id, userId) => {
  const performance = await prisma.performance.delete({
    where: {
      id,
      userId,
    },
  });
  return performance;
};

export {
  findAllPerformancesByUser,
  findPerformanceById,
  insertPerformance,
  editPerformance,
  deletePerformance,
};
