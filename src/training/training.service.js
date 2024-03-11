import ResponseError from '../utils/response-error.js';
import uploadFile from '../utils/upload-file.js';
import {
  createTrainingValidation,
  getTrainingValidation,
  updateTrainingValidation,
} from '../validation/training-validation.js';
import validate from '../validation/validation.js';
import {
  deleteTraining,
  editTraining,
  findAllTrainingByUser,
  findTrainingById, insertTraining,
} from './training.repository.js';

const getAllTrainings = async (userId) => {
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
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTrainingById,
};
