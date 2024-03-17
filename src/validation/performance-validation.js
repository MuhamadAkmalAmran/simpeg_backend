import Joi from 'joi';

const createPerformanceValidation = Joi.object({
  nilai_kerja: Joi.number().integer().min(1).positive()
    .required(),
  predikat: Joi.string().valid('A', 'AB', 'B', 'BC', 'C', 'D', 'E').required(),
  file_url: Joi.string().optional(),
});

const getPerformanceValidation = Joi.string().required();

const updatePerformanceValidation = Joi.object({
  nilai_kerja: Joi.number().integer().min(1).positive()
    .required(),
  predikat: Joi.string().valid('A', 'AB', 'B', 'BC', 'C', 'D', 'E').required(),
  file_url: Joi.string().optional(),
});

export {
  createPerformanceValidation,
  getPerformanceValidation,
  updatePerformanceValidation,
};
