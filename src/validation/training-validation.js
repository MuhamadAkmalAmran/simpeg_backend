import Joi from 'joi';

const createTrainingValidation = Joi.object({
  nama: Joi.string().required(),
  penyelenggara: Joi.string().required(),
  jpl: Joi.number().integer().positive().required(),
  tahun_kegiatan: Joi.number().integer().positive().required(),
});

const getTrainingValidation = Joi.string().required();

const updateTrainingValidation = Joi.object({
  nama: Joi.string().optional(),
  penyelenggara: Joi.string().optional(),
  jpl: Joi.number().integer().positive().optional(),
  tahun_kegiatan: Joi.number().integer().positive().optional(),
});

export {
  createTrainingValidation,
  getTrainingValidation,
  updateTrainingValidation,
};
