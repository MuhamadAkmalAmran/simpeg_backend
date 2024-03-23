import prisma from '../config/database.js';

const findAllEducation = async (userId) => {
  const educations = await prisma.education.findMany({
    where: {
      user_id: userId,
    },
  });

  return educations;
};
const findAllEducationByUser = async (userId) => {
  const educations = await prisma.education.findMany({
    where: {
      user_id: userId,
    },
  });

  return educations;
};

const ChartEducation = async () => {
  const totalSD = await prisma.education.count({
    where: {
      jenjang: {
        startsWith: 'SD',
      },
    },
  });
  const totalSMP = await prisma.education.count({
    where: {
      jenjang: {
        startsWith: 'SMP',
      },
    },
  });
  const totalSMA = await prisma.education.count({
    where: {
      jenjang: {
        startsWith: 'SMA',
      },
    },
  });
  const totalS1 = await prisma.education.count({
    where: {
      jenjang: {
        startsWith: 'S1',
      },
    },
  });

  return {
    totalSD,
    totalSMP,
    totalSMA,
    totalS1,
  };
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

const verificationEducation = async (id, educationData, userId) => {
  const verifEducation = await prisma.education.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      status_verifikasi: educationData.status_verifikasi,
      alasan_ditolak: educationData.alasan_ditolak,
    },
  });
  return verifEducation;
};

export {
  findAllEducation,
  findAllEducationByUser,
  insertEducation,
  findEducationById,
  editEducation,
  deleteEducation,
  verificationEducation,
  ChartEducation,
};
