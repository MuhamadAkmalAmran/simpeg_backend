import prisma from '../db/database.js';

const findAllPerformances = async () => {
  const performances = await prisma.performance.findMany();
  return performances;
};

const findPerformanceById = async (id) => {
  const performance = await prisma.performance.findUnique({
    where: {
      id,
    },
  });
  return performance;
};

const insertPerformance = async (performanceData) => {
  const performance = await prisma.performance.create({
    data: {
      nilai_kerja: performanceData.nilai_kerja,
      predikat: performanceData.predikat,
    },
  });
  return performance;
};

const editPerformance = async (id, performanceData) => {
  const performance = await prisma.performance.update({
    where: {
      id,
    },
    data: {
      nilai_kerja: performanceData.nilai_kerja,
      predikat: performanceData.predikat,
    },
  });
  return performance;
};

const deletePerformance = async (id) => {
  const performance = await prisma.performance.delete({
    where: {
      id,
    },
  });
  return performance;
};

export {
  findAllPerformances,
  findPerformanceById,
  insertPerformance,
  editPerformance,
  deletePerformance,
};
