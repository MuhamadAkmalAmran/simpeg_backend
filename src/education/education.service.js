import ResponseError from '../utils/response-error.js';
import {
  createEducationValidation,
  getEducationValidation,
  updateEducationValidation,
} from '../validation/education-validation.js';
import validate from '../validation/validation.js';
import {
  deleteEducation,
  editEducation,
  findAllEducation,
  findEducationById,
  insertEducation,
} from './education.repository.js';

const getAllEducation = async (userId) => {
  const educations = await findAllEducation(userId);

  return educations;
};

const getEducationById = async (id) => {
  const education = await findEducationById(id);

  if (!education) {
    throw new Error('Education not found.');
  }

  return education;
};

const createEducation = async (educationData, userId) => {
  const educationValidation = await validate(createEducationValidation, educationData);

  const education = await insertEducation(educationValidation, userId);

  return education;
};

const updateEducation = async (id, educationData, userId) => {
  const educationValidation = await validate(getEducationValidation, id);
  const educationValidationData = await validate(updateEducationValidation, educationData);
  const educationById = await findEducationById(educationValidation, userId);

  if (!educationById) {
    throw new ResponseError(404, 'Education not found.');
  }

  const education = await editEducation(educationValidation, educationValidationData);

  return education;
};

const deleteEducationById = async (id, userId) => {
  const deleteValidation = await validate(getEducationValidation, id);
  const educationById = await findEducationById(deleteValidation, userId);

  if (!educationById) {
    throw new ResponseError(404, 'Education not found');
  }

  const education = await deleteEducation(deleteValidation);

  return education;
};

export {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducationById,
};
