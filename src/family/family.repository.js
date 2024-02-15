import prisma from '../db/database.js';

const findAllFamilies = async () => {
  const families = await prisma.family.findMany();

  return families;
};

const insertFamily = async (familyData) => {
  const family = await prisma.family.create({
    data: {
      nik: familyData.nik,
      nama: familyData.nama,
      tempat: familyData.tempat,
      tanggal_lahir: familyData.tanggal_lahir,
      jenis_kelamin: familyData.jenis_kelamin,
      agama: familyData.agama,
      hubungan_kel: familyData.hubungan_kel,
    }
  });

  return family;
};

const findFamilyById = async (id) => {
  const family = await prisma.family.findUnique({
    where: {
      id,
    }
  });

  return family;
}

const editFamily = async (id, familyData) => {
  const family = await prisma.family.update({
    where: {
      id,
    },
    data: {
      nik: familyData.nik,
      nama: familyData.nama,
      tempat: familyData.tempat,
      tanggal_lahir: familyData.tanggal_lahir,
      jenis_kelamin: familyData.jenis_kelamin,
      agama: familyData.agama,
      hubungan_kel: familyData.hubungan_kel,
    }
  })

  return family;
};

const deleteFamily = async (id) => {
 const family = await prisma.family.delete({
  where: {
    id,
  }
 })
 return family;
}

export { findAllFamilies, insertFamily, editFamily, findFamilyById, deleteFamily };