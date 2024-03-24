import prisma from '../config/database.js';

const findAllTraining = async (userId) => {
  const trainings = await prisma.training.findMany({
    where: {
      user_id: userId,
      user: {
        role: 'USER',
      },
    },
  });

  return trainings;
};
const findAllTrainingByUser = async (userId) => {
  const trainings = await prisma.training.findMany({
    where: {
      user_id: userId,
    },
  });

  return trainings;
};

const findTrainingById = async (id, userId) => {
  const training = await prisma.training.findUnique({
    where: {
      id,
      user_id: userId,
    },
  });
  return training;
};

const insertTraining = async (trainingData, userId) => {
  const training = await prisma.training.create({
    data: {
      nama: trainingData.nama,
      penyelenggara: trainingData.penyelenggara,
      jpl: trainingData.jpl,
      tahun_kegiatan: trainingData.tahun_kegiatan,
      file_url: trainingData.file_url,
      user_id: userId,
    },
  });
  return training;
};

const editTraining = async (id, trainingData, userId) => {
  const training = await prisma.training.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      nama: trainingData.nama,
      penyelenggara: trainingData.penyelenggara,
      jpl: trainingData.jpl,
      tahun_kegiatan: trainingData.tahun_kegiatan,
      file_url: trainingData.file_url,
    },
  });
  return training;
};

const deleteTraining = async (id, userId) => {
  const training = await prisma.training.delete({
    where: {
      id,
      user_id: userId,
    },
  });
  return training;
};

const verificationTraining = async (id, trainingData, userId) => {
  const verifTraining = await prisma.training.update({
    where: {
      id,
      user_id: userId,
      user: {
        role: 'USER',
      },
    },
    data: {
      status_verifikasi: trainingData.status_verifikasi,
      alasan_ditolak: trainingData.alasan_ditolak,
    },
  });
  return verifTraining;
};

export {
  findAllTraining,
  findAllTrainingByUser,
  findTrainingById,
  insertTraining,
  editTraining,
  deleteTraining,
  verificationTraining,
};
