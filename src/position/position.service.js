import { findUserById } from '../user/user.repository.js';
import ResponseError from '../utils/response-error.js';
import uploadFile from '../utils/upload-file.js';
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

  return positions;
};

const createPosition = async (positionData, userId, file) => {
  const positionValidation = await validate(createPositionValidation, positionData);
  const fileUrl = await uploadFile(file);
  const position = await insertPosition({
    id: positionValidation.id,
    no_sk: positionValidation.no_sk,
    tanggal_sk: positionValidation.tanggal_sk,
    tmt: positionValidation.tmt,
    gaji_pokok: positionValidation.gaji_pokok,
    file_url: fileUrl.file_url,
  }, userId);

  return position;
};

const updatePosition = async (id, positionData, userId, file) => {
  const positionValidation = await validate(updatePositionValidation, positionData);

  const positionById = await findPositionById(id, userId);

  if (!positionById) {
    throw new ResponseError(404, 'Position not found.');
  }

  const fileUrl = await uploadFile(file);

  const position = await updatePositionById(id, {
    id: positionValidation.id,
    no_sk: positionValidation.no_sk,
    tanggal_sk: positionValidation.tanggal_sk,
    tmt: positionValidation.tmt,
    gaji_pokok: positionValidation.gaji_pokok,
    file_url: fileUrl.file_url,
  }, userId);

  return position;
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
