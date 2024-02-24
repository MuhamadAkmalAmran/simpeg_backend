import ResponseError from '../utils/response-error.js';
import { createTitleValidation, getTitleValidation } from '../validation/title-validation.js';
import validate from '../validation/validation.js';
import {
  deleteTitle,
  editTitle,
  findAllTitlesByUser,
  findTitleById,
  insertTitle,
} from './title.repository.js';

const getAllTitles = async (userId) => {
  const titles = await findAllTitlesByUser(userId);

  return titles;
};

const getTitleById = async (id, userId) => {
  const title = await findTitleById(id, userId);
  if (!title) {
    throw new ResponseError(404, 'Title not found.');
  }

  return title;
};

const createTitle = async (titleData, userId) => {
  const titleValidation = await validate(createTitleValidation, titleData);
  const title = await insertTitle(titleValidation, userId);

  return title;
};

const updateTitle = async (id, titleData, userId) => {
  const titleValidation = await validate(getTitleValidation, id);
  const titleById = await findTitleById(id, userId);

  if (!titleById) {
    throw new ResponseError(404, 'Title not found.');
  }

  const title = await editTitle(titleValidation, titleData);

  return title;
};

const deleteTitleById = async (id, userId) => {
  const titleValidation = await validate(getTitleValidation, id);
  const titleById = await getTitleById(titleValidation, userId);

  if (!titleById) {
    throw new ResponseError(404, 'Title not found.');
  }

  const title = await deleteTitle(titleValidation);

  return title;
};

export {
  getAllTitles,
  getTitleById,
  createTitle,
  updateTitle,
  deleteTitleById,
};
