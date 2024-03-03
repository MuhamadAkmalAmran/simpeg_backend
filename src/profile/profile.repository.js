import prisma from '../db/database.js';

const findAllProfilesByUser = async (userId) => {
  const profiles = await prisma.profile.findFirst({
    where: {
      user_id: userId,
    },
    include: {
      user: {
        select: {
          nama: true,
          email: true,
        },
      },
    },
  });
  return profiles;
};

const findProfileByUser = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: {
      user_id: userId,
    },
  });
  return profile;
};

const editProfile = async (profileData, userId) => {
  const profile = await prisma.profile.update({
    where: {
      user_id: userId,
    },
    data: {
      gelar_depan: profileData.gelar_depan,
      gelar_belakang: profileData.gelar_belakang,
      tempat_lahir: profileData.tempat_lahir,
      jenis_kelamin: profileData.jenis_kelamin,
      Agama: profileData.Agama,
      status_kepegawaian: profileData.status_kepegawaianan,
      nomor_telepon: profileData.nomor_telepon,
      alamat: profileData.alamat,
      provinsi: profileData.provinsi,
      kabupaten_kota: profileData.kabupaten_kota,
      kecamatan: profileData.kecamatan,
      kelurahan: profileData.kelurahan,
    },
    include: {
      user: {
        select: {
          nama: true,
          email: true,
        },
      },
    },
  });
  return profile;
};

export {
  findAllProfilesByUser,
  findProfileByUser,
  editProfile,
};
