import prisma from '../db/database.js';

const findAllEducation = async () => {
  const educations = await prisma.education.findMany();

  return educations;
};

const insertEducation = async (educationData) => {
  const education = await prisma.education.create({
    data: {
      jenjang: educationData.jenjang,
      nama_instansi: educationData.nama_instansi,
      jurusan: educationData.jurusan,
      tahun_lulus: educationData.tahun_lulus,
    },
  });

  return education;
};

const findEducationById = async (id) => {
  const education = await prisma.education.findUnique({
    where: {
      id,
    },
  });

  return education;
};

const editEducation = async (id, educationData) => {
  const education = await prisma.education.update({
    where: {
      id,
    },
    data: {
      jenjang: educationData.jenjang,
      nama_instansi: educationData.nama_instansi,
      jurusan: educationData.jurusan,
      tahun_lulus: educationData.tahun_lulus,
    },
  });

  return education;
};

const deleteEducation = async (id) => {
  const education = await prisma.education.delete({
    where: {
      id,
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
