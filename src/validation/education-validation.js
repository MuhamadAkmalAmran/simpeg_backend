import Joi from 'joi';

const createEducationValidation = Joi.object({
  jenjang: Joi.string().required(),
  nama: Joi.string().required(),
  jurusan: Joi.string().required(),
  tahun_lulus: Joi.number().required(),
  // file_url: Joi.string(),
});

const getEducationValidation = Joi.string().required();

const updateEducationValidation = Joi.object({
  jenjang: Joi.string().optional(),
  nama: Joi.string().optional(),
  jurusan: Joi.string().optional(),
  tahun_lulus: Joi.number().integer().optional(),
  // file_url: Joi.string(),
});

export {
  createEducationValidation,
  updateEducationValidation,
  getEducationValidation,
};
