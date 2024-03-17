import axios from 'axios';
import prisma from '../config/database.js';

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
  const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
  console.log(response.data);
  const provinces = response.data;
  const provinsi = provinces.find((prov) => prov.id === profileData.provinsi);
  const profile = await prisma.profile.update({
    where: {
      user_id: userId,
    },
    data: {
      gelar_depan: profileData.gelar_depan,
      gelar_belakang: profileData.gelar_belakang,
      tempat_lahir: profileData.tempat_lahir,
      tanggal_lahir: profileData.tanggal_lahir,
      jenis_kelamin: profileData.jenis_kelamin,
      agama: profileData.Agama,
      status_kepegawaian: profileData.status_kepegawaianan,
      nomor_telepon: profileData.nomor_telepon,
      alamat: profileData.alamat,
      provinsi: provinsi ? provinsi.name : null,
      kabupaten_kota: profileData.kabupaten_kota,
      kecamatan: profileData.kecamatan,
      kelurahan: profileData.kelurahan,
    },
  });
  return profile;
};

export {
  findAllProfilesByUser,
  findProfileByUser,
  editProfile,
};
