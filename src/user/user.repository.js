import bcrypt from 'bcrypt';
import prisma from '../config/database.js';
import accessToken from '../utils/jwt.js';

const findAllUsers = async () => {
  const page = 1;
  const perPage = 10;
  const skip = (page - 1) * perPage;
  const users = await prisma.user.findMany({
    where: {
      role: 'USER',
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      status_kepegawaian: true,
      titles: {
        select: {
          jabatan: true,
          unit_kerja: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
    skip,
    take: perPage,
  });

  return {
    users,
    page,
    totalItem: skip,

  };
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      status_kepegawaian: true,
      profile: {
        select: {
          tempat_lahir: true,
          tanggal_lahir: true,
          jenis_kelamin: true,
          agama: true,
        },
      },
      titles: {
        select: {
          jabatan: true,
          unit_kerja: true,
        },
      },
    },
  });
  return user;
};

const insertUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      nama: userData.nama,
      nip: userData.nip,
      status_kepegawaian: userData.status_kepegawaian,
      password: hashPassword,
      // role: userData.role,
      img_url: userData.img_url,
      profile: {
        create: {
          user_id: userData.id,
        },
      },
    },
  });

  return user;
};

const findUserCurrent = async (nip) => {
  const user = await prisma.user.findUnique({
    where: {
      nip,
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      email: true,
      role: true,
      img_url: true,
      profile: {
        select: {
          gelar_depan: true,
          gelar_belakang: true,
        },
      },
    },
  });

  return user;
};

const findUserByNIP = async (nip) => {
  const user = await prisma.user.findUnique({
    where: {
      nip,
    },
  });

  return user;
};

const updateTokenUserByNIP = async (userData, nip) => {
  const token = accessToken({
    id: userData.id,
    nip: userData.nip,
    role: userData.role,
  });
  const user = await prisma.user.update({
    where: {
      nip,
    },
    data: {
      token,
    },
    select: {
      role: true,
      token: true,
    },
  });

  return user;
};

const deleteToken = async (nip) => {
  const user = await prisma.user.update({
    where: {
      nip,
    },
    data: {
      token: null,
    },
    select: {
      nip: true,
    },
  });
  return user;
};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

const editUser = async (id, userData) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email: userData.email,
      img_url: userData.img_url,
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      status_kepegawaian: true,
      email: true,
      img_url: true,
    },
  });
  return user;
};

const userDashboard = async (nip) => {
  const user = await prisma.user.findUnique({
    where: {
      nip,
    },
    select: {
      nama: true,
      nip: true,
      img_url: true,
      profile: {
        select: {
          gelar_depan: true,
          gelar_belakang: true,
          tempat_lahir: true,
          tanggal_lahir: true,
          alamat: true,
          nomor_telepon: true,
        },
      },
      positions: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
      educations: {
        select: {
          jenjang: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
      titles: {
        select: {
          jabatan: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });
  return user;
};

export {
  findAllUsers,
  findUserById,
  findUserByNIP,
  insertUser,
  findUserCurrent,
  updateTokenUserByNIP,
  deleteToken,
  deleteUser,
  editUser,
  userDashboard,
};
