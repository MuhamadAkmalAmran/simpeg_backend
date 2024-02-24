import Joi from 'joi';

const createTitleValidation = Joi.object({
  jabatan: Joi.string().required(),
  unit_kerja: Joi.string().required(),
  tmt: Joi.date().required(),
  tanggal_berakhir: Joi.string().required(),
  no_sk: Joi.string().required(),
  tanggal_sk: Joi.string().required(),
});

const getTitleValidation = Joi.string().required();

const updateTitleValidation = Joi.object({
  jabatan: Joi.string().optional(),
  unit_kerja: Joi.string().optional(),
  tmt: Joi.date().optional(),
  tanggal_berakhir: Joi.string().optional(),
  no_sk: Joi.string().optional(),
  tanggal_sk: Joi.string().optional(),
});

export {
  createTitleValidation,
  getTitleValidation,
  updateTitleValidation,
};
