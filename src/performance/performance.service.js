import { createPerformanceValidation, updatePerformanceValidation } from '../performance-validation.js';
import ResponseError from '../utils/response-error.js';
import validate from '../validation.js';
import {
  deletePerformance,
  editPerformance,
  findAllPerformances,
  findPerformanceById,
  insertPerformance,
} from './performance.repository.js';

const getAllPerformances = async () => {
  const performances = await findAllPerformances();
  return performances;
};

const getPerformanceById = async (id) => {
  const performance = await findPerformanceById(id);
  return performance;
};

const createPerformance = async (performanceData) => {
  const performanceValidation = validate(createPerformanceValidation, performanceData);
  const performance = await insertPerformance(performanceValidation);
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
