import prisma from '../config/database.js';

const findAllPerformances = async (userId) => {
  const performances = await prisma.performance.findMany({
    where: {
      user_id: userId,
      user: {
        role: 'USER',
      },
    },
    orderBy: {
      tahun: 'desc',
    },
  });
  return performances;
};
const findAllPerformancesByUser = async (userId) => {
  const performances = await prisma.performance.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      tahun: 'desc',
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
      tahun: performanceData.tahun,
      file_url: performanceData.file_url,
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
      tahun: performanceData.tahun,
      file_url: performanceData.file_url,
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

const verificationPerformance = async (id, performanceData, userId) => {
  const verifPerformance = await prisma.performance.update({
    where: {
      id,
      user_id: userId,
      user: {
        role: 'USER',
      },
    },
    data: {
      status_verifikasi: performanceData.status_verifikasi,
      alasan_ditolak: performanceData.alasan_ditolak,
    },
  });
  return verifPerformance;
};

export {
  findAllPerformances,
  findAllPerformancesByUser,
  findPerformanceById,
  insertPerformance,
  editPerformance,
  deletePerformance,
  verificationPerformance,
};
