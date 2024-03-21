import { findUserById } from '../user/user.repository.js';
import { formatDate, validDate } from '../utils/date-format.js';
import ResponseError from '../utils/response-error.js';
import { uploadFile } from '../utils/upload-file.js';
import { createTitleValidation, getTitleValidation, updateTitleValidation } from '../validation/title-validation.js';
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

  // Date Format on several attributes
  const formattedTitles = titles.map((title) => ({
    ...title,
    tmt: formatDate(title.tmt),
    tanggal_berakhir: formatDate(title.tanggal_berakhir),
    tanggal_sk: formatDate(title.tanggal_sk),
  }));

  return formattedTitles;
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

  const TMT = validDate(titleData.tmt);
  const tanggalSK = validDate(titleData.tanggal_sk);
  const tanggalBerakhir = validDate(titleData.tanggal_berakhir);

  const fileUrl = await uploadFile(file);
  const title = await insertTitle({
    id: titleValidation.id,
    jabatan: titleValidation.jabatan,
    unit_kerja: titleValidation.unit_kerja,
    tmt: TMT,
    tanggal_berakhir: tanggalBerakhir,
    no_sk: titleValidation.no_sk,
    tanggal_sk: tanggalSK,
    file_url: fileUrl.file_url,
    user_id: titleValidation.user_id,
  }, userId);

  return {
    id: title.id,
    jabatan: title.jabatan,
    unit_kerja: title.unit_kerja,
    tmt: formatDate(TMT),
    tanggal_berakhir: formatDate(tanggalBerakhir),
    no_sk: title.no_sk,
    tanggal_sk: formatDate(tanggalSK),
    file_url: fileUrl.file_url,
    user_id: title.user_id,
  };
};

const updateTitle = async (id, titleData, userId, file) => {
  const titleId = await validate(getTitleValidation, id);
  const titleById = await findTitleById(titleId, userId);

  if (!titleById) {
    throw new ResponseError(404, 'Title not found.');
  }

  const titleValidation = await validate(updateTitleValidation, titleData);
  const TMT = titleData.tmt ? validDate(titleData.tmt) : titleById.tmt;
  const tanggalBerakhir = titleData.tanggal_berakhir
    ? validDate(titleData.tanggal_berakhir)
    : titleById.tanggal_berakhir;
  const tanggalSK = titleData.tanggal_sk ? validDate(titleData.tanggal_sk) : titleById.tanggal_sk;

  const fileUrl = await uploadFile(file);

  const title = await editTitle(titleId, {
    jabatan: titleValidation.jabatan,
    unit_kerja: titleValidation.unit_kerja,
    tmt: TMT,
    tanggal_berakhir: tanggalBerakhir,
    no_sk: titleValidation.no_sk,
    tanggal_sk: tanggalSK,
    file_url: fileUrl.file_url,
  }, userId);

  return {
    id: title.id,
    jabatan: title.jabatan,
    unit_kerja: title.unit_kerja,
    tmt: formatDate(title.tmt),
    tanggal_berakhir: formatDate(title.tanggal_berakhir),
    no_sk: title.no_sk,
    tanggal_sk: formatDate(title.tanggal_sk),
    file_url: fileUrl.file_url,
    user_id: title.user_id,
  };
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
