import prisma from '../db/database.js';

const findAllPositions = async () => {
  const positions = await prisma.position.findMany();

  return positions;
};

const insertPosition = async (positionData) => {
  const position = await prisma.position.create({
    data: {
      no_sk: positionData.no_sk,
      tanggal_sk: positionData.tanggal_sk,
      tmt: positionData.tmt,
      gaji_pokok: positionData.gaji_pokok,
      jenis_sk: positionData.jenis_sk,
      sk_url: positionData.sk_url,
    },
  });

  return position;
};

const findPositionById = async (id) => {
  const position = await prisma.position.findUnique({
    where: {
      id,
    },
  });

  return position;
};

const updatePositionById = async (id, positionData) => {
  const position = await prisma.position.update({
    where: {
      id,
    },
    data: {
      no_sk: positionData.no_sk,
      tanggal_sk: positionData.tanggal_sk,
      tmt: positionData.tmt,
      gaji_pokok: positionData.gaji_pokok,
      jenis_sk: positionData.jenis_sk,
      sk_url: positionData.sk_url,
    },
  });

  return position;
};

const deletePositionById = async (id) => {
  const position = await prisma.position.delete({
    where: {
      id,
    },
  });

  return position;
};

export {
  findAllPositions,
  insertPosition,
  findPositionById,
  updatePositionById,
  deletePositionById,
};
