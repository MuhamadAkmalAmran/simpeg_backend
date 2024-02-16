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
  if (!performanceData.nilai_kerja || !performanceData.predikation_kerja) {
    throw new Error('Field are required');
  }
  const performance = await insertPerformance(performanceData);
  return performance;
};

const updatePerformance = async (id, performanceData) => {
  const performanceById = await findPerformanceById(id);
  if (!performanceById) {
    throw new Error('Performances not found.');
  }
  const performance = await editPerformance(id, performanceData);
  return performance;
};

const deletePerformanceById = async (id) => {
  const performanceById = await findPerformanceById(id);
  if (!performanceById) {
    throw new Error('Performances not found.');
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
