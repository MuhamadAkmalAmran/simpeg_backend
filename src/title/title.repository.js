import prisma from '../db/database.js';

const findAllTitles = async () => {
  const titles = await prisma.title.findMany();

  return titles;
};

const findTitleById = async (id) => {
  const title = await prisma.title.findUnique({
    where: {
      id,
    },
  });
  return title;
};

const insertTitle = async (titleData) => {
  const title = await prisma.title.create({
    data: {
      jabatan: titleData.jabatan,
      unit_kerja: titleData.unit_kerja,
      tmt: titleData.tmt,
      tanggal_berakhir: titleData.tanggal_berakhir,
      no_sk: titleData.no_sk,
      tanggal_sk: titleData.tanggal_sk,
    },
  });
  return title;
};

const editTitle = async (id, titleData) => {
  const title = await prisma.title.update({
    where: {
      id,
    },
    data: {
      jabatan: titleData.jabatan,
      unit_kerja: titleData.unit_kerja,
      tmt: titleData.tmt,
      tanggal_berakhir: titleData.tanggal_berakhir,
      no_sk: titleData.no_sk,
      tanggal_sk: titleData.tanggal_sk,
    },
  });
  return title;
};

const deleteTitle = async (id) => {
  const title = await prisma.title.delete({
    where: {
      id,
    },
  });
  return title;
};

export {
  findAllTitles,
  findTitleById,
  insertTitle,
  editTitle,
  deleteTitle,
};
