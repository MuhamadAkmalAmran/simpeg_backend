import {
  deletePositionById,
  findAllPositions,
  findPositionById,
  insertPosition,
  updatePositionById,
} from './position.repository.js';

const getAllPositions = async () => {
  const positions = await findAllPositions();

  return positions;
};

const createPosition = async (positionData) => {
  if (!positionData.no_sk
    || !positionData.tanggal_sk
    || !positionData.tmt
    || !positionData.gaji_pokok
    || !positionData.jenis_sk) {
    throw new Error('Fields are required.');
  }

  const position = await insertPosition(positionData);

  return position;
};

const updatePosition = async (id, positionData) => {
  const positionById = await findPositionById(id);

  if (!positionById) {
    throw new Error('Position not found.');
  }

  const position = await updatePositionById(id, positionData);

  return position;
};

const deletePosition = async (id) => {
  const positionById = await findPositionById(id);

  if (!positionById) {
    throw new Error('Position not found.');
  }

  const position = await deletePositionById(id);

  return position;
};

export {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
};
