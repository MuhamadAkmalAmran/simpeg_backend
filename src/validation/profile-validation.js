import Joi from 'joi';

const updateProfileValidation = Joi.object({
  gelar_depan: Joi.string().optional(),
  gelar_belakang: Joi.string().optional(),
  tempat_lahir: Joi.string().optional(),
  tanggal_lahir: Joi.date().optional(),
  Agama: Joi.string().optional(),
  golongan_darah: Joi.string().optional(),
  nomor_telepon: Joi.string().optional(),
  alamat: Joi.string().optional(),
  provinsi: Joi.string().optional(),
  kabupaten_kota: Joi.string().optional(),
  kecamatan: Joi.string().optional(),
  kelurahan: Joi.string().optional(),
});

const getProfileValidation = Joi.string().required();

export {
  updateProfileValidation,
  getProfileValidation,
};
