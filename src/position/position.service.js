import { findUserById } from '../user/user.repository.js';
import { formatDate, validDate } from '../utils/date-format.js';
import ResponseError from '../utils/response-error.js';
import { uploadFile } from '../utils/upload-file.js';
import {
  createPositionValidation,
  getPositionValidation,
  updatePositionValidation,
} from '../validation/position-validation.js';
import validate from '../validation/validation.js';
import verifValidation from '../validation/verification-validation.js';
import {
  deletePositionById,
  findAllPositions,
  findAllPositionsByUser,
  findPositionById,
  insertPosition,
  updatePositionById,
  verificationPosition,
} from './position.repository.js';

// admin role

const getAllPositions = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const positions = await findAllPositions(userId);

  return positions;
};

const verifPosition = async (id, positionData, userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }
  const positionById = await findPositionById(id, userId);

  if (!positionById) {
    throw new ResponseError(404, 'Position not found');
  }
  const positionVerifValidation = await validate(verifValidation, positionData);
  const positionVerif = await verificationPosition(id, positionVerifValidation, userId);

  return positionVerif;
};

// user role

const getAllPositionsByUser = async (userId) => {
  const positions = await findAllPositionsByUser(userId);

  // Date Format on several attributes
  const formattedPositions = positions.map((position) => ({
    ...position,
    tanggal_sk: formatDate(position.tanggal_sk),
    tmt: formatDate(position.tmt),
  }));

  return formattedPositions;
};

const createPosition = async (positionData, userId, file) => {
  const positionValidation = await validate(createPositionValidation, positionData);

  // Deklarasi valid Date
  const tanggalSK = validDate(positionData.tanggal_sk);
  const TMT = validDate(positionData.tmt);

  // Deklarasi Upload file
  const fileUrl = await uploadFile(file);

  const position = await insertPosition({
    id: positionValidation.id,
    no_sk: positionValidation.no_sk,
    tanggal_sk: tanggalSK,
    tmt: TMT,
    gaji_pokok: positionValidation.gaji_pokok,
    jenis_sk: positionValidation.jenis_sk,
    file_url: fileUrl.file_url,
  }, userId);

  return {
    id: position.id,
    no_sk: position.no_sk,
    tanggal_sk: formatDate(position.tanggal_sk),
    tmt: formatDate(position.tmt),
    jenis_sk: position.jenis_sk,
    gaji_pokok: position.gaji_pokok,
    file_url: position.file_url,
    user_id: position.user_id,
    status_verifikasi: position.status_verifikasi,
    alasan_ditolak: position.alasan_ditolak,
  };
};

const updatePosition = async (id, positionData, userId, file) => {
  const positionById = await findPositionById(id, userId);
  if (!positionById) {
    throw new ResponseError(404, 'Position not found.');
  }

  const positionValidation = await validate(updatePositionValidation, positionData);

  const fileUrl = await uploadFile(file);

  const position = await updatePositionById(id, {
    id: positionValidation.id,
    no_sk: positionValidation.no_sk,
    tanggal_sk: positionValidation.tanggal_sk,
    tmt: positionValidation.tmt,
    gaji_pokok: positionValidation.gaji_pokok,
    jenis_sk: positionValidation.jenis_sk,
    file_url: fileUrl.file_url,
  }, userId);

  return {
    id: position.id,
    no_sk: position.no_sk,
    tanggal_sk: formatDate(positionValidation.tanggal_sk),
    tmt: formatDate(positionValidation.tmt),
    jenis_sk: position.jenis_sk,
    gaji_pokok: position.gaji_pokok,
    file_url: position.file_url,
    user_id: position.user_id,
    status_verifikasi: position.status_verifikasi,
    alasan_ditolak: position.alasan_ditolak,
  };
};

const deletePosition = async (id, userId) => {
  const positionValidation = await validate(getPositionValidation, id);

  const positionById = await findPositionById(positionValidation, userId);

  if (!positionById) {
    throw new ResponseError(404, 'Position not found.');
  }

  const position = await deletePositionById(positionValidation, userId);

  return position;
};

export {
  getAllPositions,
  getAllPositionsByUser,
  createPosition,
  updatePosition,
  deletePosition,
  verifPosition,
};
