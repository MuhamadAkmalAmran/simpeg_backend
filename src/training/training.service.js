import {
  deleteTraining,
  editTraining,
  findAllTraining,
  findTrainingById, insertTraining,
} from './training.repository.js';

const getAllTrainings = async () => {
  const trainings = await findAllTraining();

  return trainings;
};

const getTrainingById = async (id) => {
  const training = await findTrainingById(id);

  if (!training) {
    throw new Error('Training not found.');
  }

  return training;
};

const createTraining = async (trainingData) => {
  if (!trainingData.nama || !trainingData.penyelenggara
    || !trainingData.jpl || !trainingData.tahun_kegiatan) {
    throw new Error('Fields are required');
  }
  const training = await insertTraining(trainingData);

  return training;
};

const updateTraining = async (id, trainingData) => {
  const trainingById = await findTrainingById(id);

  if (!trainingById) {
    throw new Error('Training not found.');
  }
  const training = await editTraining(id, trainingData);

  return training;
};

const deleteTrainingById = async (id) => {
  const trainingById = await findTrainingById(id);

  if (!trainingById) {
    throw new Error('Training not found.');
  }
  const training = await deleteTraining(id);
  return training;
};

export {
  getAllTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTrainingById,
};
