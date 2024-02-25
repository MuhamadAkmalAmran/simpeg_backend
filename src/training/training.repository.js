import prisma from '../db/database.js';

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

export {
  findAllTrainingByUser,
  findTrainingById,
  insertTraining,
  editTraining,
  deleteTraining,
};
