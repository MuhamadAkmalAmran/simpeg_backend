import { findUserById } from '../user/user.repository.js';
import ResponseError from '../utils/response-error.js';
import uploadFile from '../utils/upload-file.js';
import { createTitleValidation, getTitleValidation } from '../validation/title-validation.js';
import validate from '../validation/validation.js';
import verifValidation from '../validation/verification-validation.js';
import {
  deleteTitle,
  editTitle,
  findAllTitles,
  findAllTitlesByUser,
  findTitleById,
  insertTitle,
  verificationTitle,
} from './title.repository.js';

// admin role

const getAllTitles = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const titles = await findAllTitles(userId);

  return titles;
};

const verifTitle = async (id, titleData, userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const titleById = await findTitleById(id, userId);

  if (!titleById) {
    throw new ResponseError(404, 'Title not found');
  }
  const titleVerifValidation = await validate(verifValidation, titleData);
  const titleVerif = await verificationTitle(id, titleVerifValidation, userId);

  return titleVerif;
};

// user role

const getAllTitlesByUser = async (userId) => {
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

const createTitle = async (titleData, userId, file) => {
  const titleValidation = await validate(createTitleValidation, titleData);
  const fileUrl = await uploadFile(file);
  const title = await insertTitle({
    id: titleValidation.id,
    jabatan: titleValidation.jabatan,
    unit_kerja: titleValidation.unit_kerja,
    tmt: titleValidation.tmt,
    tanggal_berakhir: titleValidation.tanggal_berakhir,
    no_sk: titleValidation.no_sk,
    tanggal_sk: titleValidation.tanggal_sk,
    file_url: fileUrl.file_url,
  }, userId);

  return title;
};

const updateTitle = async (id, titleData, userId, file) => {
  const titleValidation = await validate(getTitleValidation, id);
  const titleById = await findTitleById(id, userId);

  if (!titleById) {
    throw new ResponseError(404, 'Title not found.');
  }
  const fileUrl = await uploadFile(file);

  const title = await editTitle(titleValidation, {
    id: titleData.id,
    jabatan: titleData.jabatan,
    unit_kerja: titleData.unit_kerja,
    tmt: titleData.tmt,
    tanggal_berakhir: titleData.tanggal_berakhir,
    no_sk: titleData.no_sk,
    tanggal_sk: titleData.tanggal_sk,
    file_url: fileUrl.file_url,
  });

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
  getAllTitlesByUser,
  getTitleById,
  createTitle,
  updateTitle,
  deleteTitleById,
  verifTitle,
};
