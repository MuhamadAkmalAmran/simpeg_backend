import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const createFamilyValidation = Joi.object({
  nik: Joi.string().length(16).message('NIK harus 16 karakter')
    .required(),
  nama: Joi.string().required(),
  tempat: Joi.string().required(),
  tanggal_lahir: Joi.date().format('YYYY-MM-DD').required(),
  jenis_kelamin: Joi.string().required(),
  agama: Joi.string().required(),
  hubungan_kel: Joi.string().required(),
});

const getFamilyValidation = Joi.string().required();

const getFamilyByUserValidation = Joi.object({
  user_id: Joi.string().required(),
});

const updateFamilyValidation = Joi.object({
  nik: Joi.string().length(16)
    .required(),
  nama: Joi.string().required(),
  tempat: Joi.string().required(),
  tanggal_lahir: Joi.date().required(),
  jenis_kelamin: Joi.string().required(),
  agama: Joi.string().required(),
  hubungan_kel: Joi.string().required(),
});

export {
  getFamilyValidation,
  createFamilyValidation,
  updateFamilyValidation,
  getFamilyByUserValidation,
};
