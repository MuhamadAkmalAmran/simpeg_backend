// import { format, formatISO, parse } from 'date-fns';
import prisma from '../config/database.js';

const findAllFamilies = async (userId) => {
  const families = await prisma.family.findMany({
    where: {
      user_id: userId,
      user: {
        role: 'USER',
      },
    },
  });

  return families;
};
const findAllFamiliesByUser = async (userId) => {
  const families = await prisma.family.findMany({
    where: {
      user_id: userId,
    },
  });

  return families;
};

const insertFamily = async (familyData, userId) => {
  const family = await prisma.family.create({
    data: {
      nik: familyData.nik,
      nama: familyData.nama,
      tempat: familyData.tempat,
      tanggal_lahir: familyData.tanggal_lahir,
      jenis_kelamin: familyData.jenis_kelamin,
      agama: familyData.agama,
      hubungan_kel: familyData.hubungan_kel,
      user_id: userId,
    },
  });

  return family;
};

const findFamilyById = async (id, userId) => {
  const family = await prisma.family.findUnique({
    where: {
      id,
      user_id: userId,
    },
  });

  return family;
};

const editFamily = async (id, familyData, userId) => {
  const family = await prisma.family.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      nik: familyData.nik,
      nama: familyData.nama,
      tempat: familyData.tempat,
      tanggal_lahir: familyData.tanggal_lahir,
      jenis_kelamin: familyData.jenis_kelamin,
      agama: familyData.agama,
      hubungan_kel: familyData.hubungan_kel,
    },
  });

  return family;
};

const deleteFamily = async (id, userId) => {
  const family = await prisma.family.delete({
    where: {
      id,
      user_id: userId,
    },
  });
  return family;
};

const verificationFamily = async (id, familyData, userId) => {
  const verifFamily = await prisma.family.update({
    where: {
      id,
      user_id: userId,
      user: {
        role: 'USER',
      },
    },
    data: {
      status_verifikasi: familyData.status_verifikasi,
      alasan_ditolak: familyData.alasan_ditolak,
    },
  });
  return verifFamily;
};

export {
  findAllFamilies,
  findAllFamiliesByUser,
  insertFamily,
  editFamily,
  findFamilyById,
  deleteFamily,
  verificationFamily,
};
