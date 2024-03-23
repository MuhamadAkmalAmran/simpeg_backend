import prisma from '../config/database.js';

export const findAllSchools = async (schoolData) => {
  const size = 10;
  const skip = (schoolData.page - 1) * size;

  const schools = await prisma.school.findMany({
    where: {
      AND: [
        {
          nama: {
            contains: schoolData.nama,
          },
        },
      ],
    },
    take: size,
    skip,
  });

  const totalSchools = await prisma.school.count({
    where: {
      AND: [
        {
          nama: {
            contains: schoolData.nama,
          },
        },
      ],
    },
  });
  return {
    schools,
    page: schoolData.page,
    total_item: totalSchools,
    total_page: Math.ceil(totalSchools / size),
  };
};

export const findSchoolById = async (id) => {
  const school = await prisma.school.findUnique({
    where: {
      id,
    },
  });
  return school;
};

export const insertSchool = async (schoolData) => {
  const school = await prisma.school.create({
    data: {
      npsn: schoolData.npsn,
      nama: schoolData.nama,
      jenjang: schoolData.jenjang,
      alamat: schoolData.alamat,
    },
  });
  return school;
};

export const editSchool = async (id, schoolData) => {
  const school = await prisma.school.update({
    where: {
      id,
    },
    data: {
      npsn: schoolData.npsn,
      nama: schoolData.nama,
      jenjang: schoolData.jenjang,
      alamat: schoolData.alamat,
    },
  });
  return school;
};

export const deleteSchool = async (id) => {
  const school = await prisma.school.delete({
    where: {
      id,
    },
  });
  return school;
};
