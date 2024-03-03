import Joi from 'joi';

const createDocumentValidation = Joi.object({
  jenis_dokumen: Joi.string().required(),
  no_dokumen: Joi.string().required(),
});

const getDocumentValidation = Joi.string().required();

const updateDocumentValidation = Joi.object({
  jenis_dokumen: Joi.string().optional(),
  no_dokumen: Joi.string().optional(),
});

export {
  createDocumentValidation,
  getDocumentValidation,
  updateDocumentValidation,
};
