import {
  deleteEducation,
  editEducation,
  findAllEducation,
  findEducationById,
  insertEducation,
} from './education.repository.js';

const getAllEducation = async () => {
  const educations = await findAllEducation();

  return educations;
};

const getEducationById = async (id) => {
  const education = await findEducationById(id);

  if (!education) {
    throw new Error('Education not found.');
  }

  return education;
};

const createEducation = async (educationData) => {
  if (!educationData.jenjang || !educationData.nama_instansi
    || !educationData.jurusan || !educationData.tahun_lulus) {
    throw new Error('Fields are required');
  }

  const education = await insertEducation(educationData);

  return education;
};

const updateEducation = async (id, educationData) => {
  const educationById = await findEducationById(id);

  if (!educationById) {
    throw new Error('Education not found.');
  }

  const education = await editEducation(id, educationData);

  return education;
};

const deleteEducationById = async (id) => {
  const educationById = await findEducationById(id);

  if (!educationById) {
    throw new Error('Education not found');
  }

  const education = await deleteEducation(id);

  return education;
};

export {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducationById,
};
