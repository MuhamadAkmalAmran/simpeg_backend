import Joi from 'joi';

const createPositionValidation = Joi.object({
  no_sk: Joi.string().required(),
  tanggal_sk: Joi.date().required(),
  tmt: Joi.date().required(),
  gaji_pokok: Joi.number().required(),
  jenis_sk: Joi.string().required(),
});

const getPositionValidation = Joi.string().required();

const updatePositionValidation = Joi.object({
  no_sk: Joi.string().optional(),
  tanggal_sk: Joi.date().optional(),
  tmt: Joi.date().optional(),
  gaji_pokok: Joi.number().positive().optional(),
  jenis_sk: Joi.string().optional(),
});

export {
  createPositionValidation,
  getPositionValidation,
  updatePositionValidation,
};
