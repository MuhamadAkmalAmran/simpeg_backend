import ResponseError from '../utils/response-error.js';
import { createTrainingValidation, getTrainingValidation } from '../validation/tarining-va;lidation.js';
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

const createTraining = async (trainingData, userId) => {
  const trainingValidation = await validate(createTrainingValidation, trainingData);
  const training = await insertTraining(trainingValidation, userId);

  return training;
};

const updateTraining = async (id, trainingData, userId) => {
  const trainingValidation = await validate(getTrainingValidation, id);
  const trainingById = await getTrainingById(trainingValidation, userId);

  if (!trainingById) {
    throw new ResponseError(404, 'Training not found.');
  }
  const training = await editTraining(trainingValidation, trainingData);

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
