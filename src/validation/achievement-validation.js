import Joi from 'joi';

const createAchievementValidation = Joi.object({
  nama: Joi.string().required(),
  tingkat: Joi.string().required(),
  tahun: Joi.number().integer().required(),
  penyelenggara: Joi.string().required(),
});

const getAchievementValidation = Joi.string().required();

const updateAchievementValidation = Joi.object({
  nama: Joi.string().optional(),
  tingkat: Joi.string().optional(),
  tahun: Joi.number().integer().optional(),
  penyelenggara: Joi.string().optional(),
});
export {
  createAchievementValidation,
  getAchievementValidation,
  updateAchievementValidation,
};
