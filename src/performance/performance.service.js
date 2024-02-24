import { createPerformanceValidation, updatePerformanceValidation } from '../validation/performance-validation.js';
import ResponseError from '../utils/response-error.js';
import validate from '../validation/validation.js';
import {
  deletePerformance,
  editPerformance,
  findAllPerformancesByUser,
  findPerformanceById,
  insertPerformance,
} from './performance.repository.js';

const getAllPerformances = async (userId) => {
  const performances = await findAllPerformancesByUser(userId);
  return performances;
};

const getPerformanceById = async (id) => {
  const performance = await findPerformanceById(id);
  return performance;
};

const createPerformance = async (performanceData, userId) => {
  const performanceValidation = validate(createPerformanceValidation, performanceData);
  const performance = await insertPerformance(performanceValidation, userId);
  return performance;
};

const updatePerformance = async (id, performanceData) => {
  const performanceById = await findPerformanceById(id);
  if (!performanceById) {
    throw new ResponseError(404, 'Performances not found.');
  }
  const performanceValidation = validate(updatePerformanceValidation, performanceData);
  const performance = await editPerformance(id, performanceValidation);
  return performance;
};

const deletePerformanceById = async (id) => {
  const performanceById = await findPerformanceById(id);
  if (!performanceById) {
    throw new ResponseError(404, 'Performances not found.');
  }
  const performance = await deletePerformance(id);
  return performance;
};

export {
  getAllPerformances,
  getPerformanceById,
  createPerformance,
  updatePerformance,
  deletePerformanceById,
};
