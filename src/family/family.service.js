import { findUserById } from '../user/user.repository.js';
import { formatDate, validDate } from '../utils/date-format.js';
import ResponseError from '../utils/response-error.js';
import {
  createFamilyValidation,
  getFamilyValidation,
  updateFamilyValidation,
} from '../validation/family-validation.js';
import validate from '../validation/validation.js';
import verifValidation from '../validation/verification-validation.js';
import {
  deleteFamily,
  editFamily,
  findAllFamilies,
  findAllFamiliesByUser,
  findFamilyById,
  insertFamily,
  verificationFamily,
} from './family.repository.js';

// admin role
const getAllFamilies = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const families = await findAllFamilies(userId);

  return families;
};

const verifFamily = async (id, familyData, userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const familyById = await findFamilyById(id, userId);

  if (!familyById) {
    throw new ResponseError(404, 'Family not found');
  }
  const famVerifValidation = await validate(verifValidation, familyData);
  const familyVerif = await verificationFamily(id, famVerifValidation, userId);

  return familyVerif;
};

// user role
const getAllFamiliesByUser = async (userId) => {
  const families = await findAllFamiliesByUser(userId);

  const formattedFamilies = families.map((family) => ({
    ...family,
    tanggal_lahir: formatDate(family.tanggal_lahir),
  }));

  return formattedFamilies;
};

const createFamily = async (familyData, userId) => {
  const familyValidation = await validate(createFamilyValidation, familyData);

  const tanggalLahir = validDate(familyData.tanggal_lahir);
  const family = await insertFamily({
    id: familyValidation.id,
    nik: familyValidation.nik,
    nama: familyValidation.nama,
    tempat: familyValidation.tempat,
    tanggal_lahir: tanggalLahir,
    jenis_kelamin: familyValidation.jenis_kelamin,
    agama: familyValidation.agama,
    hubungan_kel: familyValidation.hubungan_kel,
    user_id: familyValidation.user_id,
  }, userId);

  return {
    id: family.id,
    nikak: family.nik,
    nama: family.nama,
    tempat: family.tempat,
    tanggal_lahir: formatDate(family.tanggal_lahir),
    jenis_kelamin: family.jenis_kelamin,
    agama: family.agama,
    hubungan_kel: family.hubungan_kel,
    user_id: family.user_id,
  };
};

const updateFamily = async (id, familyData, userId) => {
  const familyId = await validate(getFamilyValidation, id);
  const familyById = await findFamilyById(familyId, userId);

  if (!familyById) {
    throw new ResponseError(404, 'Family not found.');
  }
  const tanggalLahir = familyData.tanggal_lahir
    ? validDate(familyData.tanggal_lahir)
    : familyById.tanggal_lahir;

  const familyValidation = await validate(updateFamilyValidation, familyData);

  const family = await editFamily(id, {
    nik: familyValidation.nik,
    nama: familyValidation.nama,
    tempat: familyValidation.tempat,
    tanggal_lahir: tanggalLahir,
    jenis_kelamin: familyValidation.jenis_kelamin,
    agama: familyValidation.agama,
    hubungan_kel: familyValidation.hubungan_kel,
    user_id: familyValidation.user_id,
  }, userId);

  return {
    id: family.id,
    nik: family.nik,
    nama: family.nama,
    tempat: family.tempat,
    tanggal_lahir: formatDate(family.tanggal_lahir),
    jenis_kelamin: family.jenis_kelamin,
    agama: family.agama,
    hubungan_kel: family.hubungan_kel,
    user_id: family.user_id,
  };
};

const deleteFamilyById = async (id, userId) => {
  const familyValidation = await validate(getFamilyValidation, id);
  const familyById = await findFamilyById(familyValidation);
  if (!familyById) {
    throw new ResponseError(404, 'Family not found.');
  }
  const family = await deleteFamily(familyValidation, userId);

  if (!family) {
    throw new ResponseError(401, 'Unathorized');
  }

  return family;
};

export {
  getAllFamilies,
  getAllFamiliesByUser,
  createFamily,
  updateFamily,
  deleteFamilyById,
  verifFamily,
};
