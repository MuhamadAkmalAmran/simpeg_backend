import { createPerformanceValidation, updatePerformanceValidation } from '../validation/performance-validation.js';
import ResponseError from '../utils/response-error.js';
import validate from '../validation/validation.js';
import {
  deletePerformance,
  editPerformance,
  findAllPerformances,
  findAllPerformancesByUser,
  findPerformanceById,
  insertPerformance,
  verificationPerformance,
} from './performance.repository.js';
import { findUserById } from '../user/user.repository.js';
import verifValidation from '../validation/verification-validation.js';

// admin role

const getAllPerformances = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const performances = await findAllPerformances(userId);
  return performances;
};

const verifPerformance = async (id, performanceData, userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const performanceById = await findPerformanceById(id, userId);

  if (!performanceById) {
    throw new ResponseError(404, 'Performance not found');
  }
  const PerformVerifValidation = await validate(verifValidation, performanceData);
  const performanceVerif = await verificationPerformance(id, PerformVerifValidation, userId);

  return performanceVerif;
};

// user role

const getAllPerformancesByUser = async (userId) => {
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
  getAllPerformancesByUser,
  getPerformanceById,
  createPerformance,
  updatePerformance,
  deletePerformanceById,
  verifPerformance,
};
