import Joi from 'joi';

const createDocumentValidation = Joi.object({
  jenis_dokumen: Joi.string().valid('KTP', 'KK', 'NBM', 'PASPOR', 'NPWP', 'BPJS', 'NUPTK').required(),
  no_dokumen: Joi.string().required(),
  // file_url: Joi.string().message('File is required').required(),
});

const getDocumentValidation = Joi.string().required();

const updateDocumentValidation = Joi.object({
  jenis_dokumen: Joi.string().valid('KTP', 'KK', 'NBM', 'PASPOR', 'NPWP', 'BPJS', 'NUPTK').optional(),
  no_dokumen: Joi.string().optional(),
});

export {
  createDocumentValidation,
  getDocumentValidation,
  updateDocumentValidation,
};
