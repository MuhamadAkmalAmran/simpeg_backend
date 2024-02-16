import {
  deleteTitle,
  editTitle,
  findAllTitles,
  findTitleById,
  insertTitle,
} from './title.repository.js';

const getAllTitles = async () => {
  const titles = await findAllTitles();

  return titles;
};

const getTitleById = async (id) => {
  const title = await findTitleById(id);
  if (!title) {
    throw new Error('Title not found.');
  }

  return title;
};

const createTitle = async (titleData) => {
  if (!titleData.jabatan || !titleData.unit_kerja || !titleData.tmt
    || !titleData.tanggal_berakhir || !titleData.no_sk || !titleData.tanggal_sk) {
    throw new Error('Fields are required');
  }
  const title = await insertTitle(titleData);

  return title;
};

const updateTitle = async (id, titleData) => {
  const titleById = await findTitleById(id);

  if (!titleById) {
    throw new Error('Title not found.');
  }

  const title = await editTitle(id, titleData);

  return title;
};

const deleteTitleById = async (id) => {
  const titleById = await findTitleById(id);

  if (!titleById) {
    throw new Error('Title not found.');
  }

  const title = await deleteTitle(id);

  return title;
};

export {
  getAllTitles,
  getTitleById,
  createTitle,
  updateTitle,
  deleteTitleById,
};
