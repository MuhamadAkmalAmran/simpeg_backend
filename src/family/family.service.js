import ResponseError from '../utils/response-error.js';
import {
  createFamilyValidation,
  getFamilyValidation,
} from '../validation/family-validation.js';
import validate from '../validation/validation.js';
import {
  deleteFamily,
  editFamily,
  findAllFamiliesByUser,
  findFamilyById,
  insertFamily,
} from './family.repository.js';

const getAllFamilies = async (userId) => {
  const families = await findAllFamiliesByUser(userId);

  return families;
};

const createFamily = async (familyData, userId) => {
  const familyValidation = validate(createFamilyValidation, familyData);

  const family = await insertFamily(familyValidation, userId);

  return family;
};

const updateFamily = async (id, familyData, userId) => {
  const familyValidation = await validate(getFamilyValidation, id);
  const familyById = await findFamilyById(familyValidation, userId);

  if (!familyById) {
    throw new ResponseError(404, 'Family not found.');
  }

  const family = await editFamily(familyValidation, familyData);

  return family;
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
  createFamily,
  updateFamily,
  deleteFamilyById,
};
