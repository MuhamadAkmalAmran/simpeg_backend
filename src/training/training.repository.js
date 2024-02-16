import prisma from '../db/database.js';

const findAllTraining = async () => {
  const trainings = await prisma.training.findMany();

  return trainings;
};

const findTrainingById = async (id) => {
  const training = await prisma.training.findUnique({
    where: {
      id,
    },
  });
  return training;
};

const insertTraining = async (trainingData) => {
  const training = await prisma.training.create({
    data: {
      nama: trainingData.nama,
      penyelenggara: trainingData.penyelenggara,
      jpl: trainingData.jpl,
      tahun_kegiatan: trainingData.tahun_kegiatan,
    },
  });
  return training;
};

const editTraining = async (id, trainingData) => {
  const training = await prisma.training.update({
    where: {
      id,
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

const deleteTraining = async (id) => {
  const training = await prisma.training.delete({
    where: {
      id,
    },
  });
  return training;
};

export {
  findAllTraining,
  findTrainingById,
  insertTraining,
  editTraining,
  deleteTraining,
};
