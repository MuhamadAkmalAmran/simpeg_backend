import { findUserById } from '../user/user.repository.js';
import ResponseError from '../utils/response-error.js';
import uploadFile from '../utils/upload-file.js';
import {
  createTrainingValidation,
  getTrainingValidation,
  updateTrainingValidation,
} from '../validation/training-validation.js';
import validate from '../validation/validation.js';
import verifValidation from '../validation/verification-validation.js';
import {
  deleteTraining,
  editTraining,
  findAllTraining,
  findAllTrainingByUser,
  findTrainingById, insertTraining,
  verificationTraining,
} from './training.repository.js';

// admin role

const getAllTrainings = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const titles = await findAllTraining(userId);

  return titles;
};

const verifTraining = async (id, trainingData, userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const trainingById = await findTrainingById(id, userId);

  if (!trainingById) {
    throw new ResponseError(404, 'Training not found');
  }
  const trainingVerifValidation = await validate(verifValidation, trainingData);
  const trainingVerif = await verificationTraining(id, trainingVerifValidation, userId);

  return trainingVerif;
};

// user role

const getAllTrainingsByUser = async (userId) => {
  const trainings = await findAllTrainingByUser(userId);

  return trainings;
};

const getTrainingById = async (id, userId) => {
  const trainingValidation = await validate(getTrainingValidation, id);
  const training = await findTrainingById(trainingValidation, userId);

  if (!training) {
    throw new ResponseError(404, 'Training not found.');
  }

  return training;
};

const createTraining = async (trainingData, userId, file) => {
  const trainingValidation = await validate(createTrainingValidation, trainingData);
  const fileUrl = await uploadFile(file);
  const training = await insertTraining({
    id: trainingValidation.id,
    nama: trainingValidation.nama,
    penyelenggara: trainingValidation.penyelenggara,
    jpl: trainingValidation.jpl,
    tahun_kegiatan: trainingValidation.tahun_kegiatan,
    file_url: fileUrl.file_url,
  }, userId);

  return training;
};

const updateTraining = async (id, trainingData, userId, file) => {
  const trainingValidation = await validate(getTrainingValidation, id);
  const trainingValidationData = await validate(updateTrainingValidation, trainingData);
  const trainingById = await getTrainingById(trainingValidation, userId);

  if (!trainingById) {
    throw new ResponseError(404, 'Training not found.');
  }
  const fileUrl = await uploadFile(file);

  const training = await editTraining(trainingValidation, {
    id: trainingValidationData.id,
    nama: trainingValidationData.nama,
    penyelenggara: trainingValidationData.penyelenggara,
    jpl: trainingValidationData.jpl,
    tahun_kegiatan: trainingValidationData.tahun_kegiatan,
    file_url: fileUrl.file_url,
  });

  return training;
};

const deleteTrainingById = async (id, userId) => {
  const trainingValidation = await validate(getTrainingValidation, id);
  const trainingById = await getTrainingById(trainingValidation, userId);

  if (!trainingById) {
    throw new ResponseError(404, 'Training not found.');
  }
  const training = await deleteTraining(trainingValidation);
  return training;
};

export {
  getAllTrainings,
  getAllTrainingsByUser,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTrainingById,
  verifTraining,
};
