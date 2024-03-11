import prisma from '../config/database.js';

const findAllEducation = async (userId) => {
  const educations = await prisma.education.findMany({
    where: {
      user_id: userId,
    },
  });

  return educations;
};

const insertEducation = async (educationData, userId) => {
  const education = await prisma.education.create({
    data: {
      jenjang: educationData.jenjang,
      nama: educationData.nama,
      jurusan: educationData.jurusan,
      tahun_lulus: educationData.tahun_lulus,
      file_url: educationData.file_url,
      user_id: userId,
    },
  });

  return education;
};

const findEducationById = async (id, userId) => {
  const education = await prisma.education.findUnique({
    where: {
      id,
      user_id: userId,
    },
  });

  return education;
};

const editEducation = async (id, educationData, userId) => {
  const education = await prisma.education.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      jenjang: educationData.jenjang,
      nama: educationData.nama,
      jurusan: educationData.jurusan,
      tahun_lulus: educationData.tahun_lulus,
    },
  });

  return education;
};

const deleteEducation = async (id, userId) => {
  const education = await prisma.education.delete({
    where: {
      id,
      user_id: userId,
    },
  });

  return education;
};

export {
  findAllEducation,
  insertEducation,
  findEducationById,
  editEducation,
  deleteEducation,
};
