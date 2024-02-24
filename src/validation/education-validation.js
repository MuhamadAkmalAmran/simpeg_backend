import Joi from 'joi';

const createEducationValidation = Joi.object({
  jenjang: Joi.string().required(),
  nama_instnasi: Joi.string().required(),
  jurusan: Joi.string().required(),
  tahun_lulua: Joi.number().required(),
});

const getEducationValidation = Joi.string().required();

export {
  createEducationValidation,
  getEducationValidation,
};
