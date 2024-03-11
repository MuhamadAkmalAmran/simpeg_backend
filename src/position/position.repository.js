import prisma from '../config/database.js';

const findAllPositionsByUser = async (userId) => {
  const positions = await prisma.position.findMany({
    where: {
      user_id: userId,
    },
  });

  return positions;
};

const insertPosition = async (positionData, userId) => {
  const position = await prisma.position.create({
    data: {
      no_sk: positionData.no_sk,
      tanggal_sk: positionData.tanggal_sk,
      tmt: positionData.tmt,
      gaji_pokok: positionData.gaji_pokok,
      file_url: positionData.file_url,
      user_id: userId,
    },
  });

  return position;
};

const findPositionById = async (id, userId) => {
  const position = await prisma.position.findUnique({
    where: {
      id,
      user_id: userId,
    },
  });

  return position;
};

const updatePositionById = async (id, positionData, userId) => {
  const position = await prisma.position.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      no_sk: positionData.no_sk,
      tanggal_sk: positionData.tanggal_sk,
      tmt: positionData.tmt,
      gaji_pokok: positionData.gaji_pokok,
      file_url: positionData.file_url,
    },
  });

  return position;
};

const deletePositionById = async (id, userId) => {
  const position = await prisma.position.delete({
    where: {
      id,
      user_id: userId,
    },
  });

  return position;
};

export {
  findAllPositionsByUser,
  insertPosition,
  findPositionById,
  updatePositionById,
  deletePositionById,
};
