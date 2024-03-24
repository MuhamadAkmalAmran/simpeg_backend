import bcrypt from 'bcrypt';
import prisma from '../config/database.js';
import accessToken from '../utils/jwt.js';

const findAllUsers = async (userData) => {
  const size = 10;
  const skip = (userData.page - 1) * size;

  const filters = [];

  if (userData.nama) {
    filters.push({
      nama: userData.nama,
    });
  }
  if (userData.status_kepegawaian) {
    filters.push({
      status_kepegawaian: userData.status_kepegawaian,
    });
  }
  if (userData.unit_kerja) {
    filters.push({
      unit_kerja: {
        nama: {
          contains: userData.unit_kerja,
        },
      },
    });
  }
  if (userData.jabatan) {
    filters.push({
      titles: {
        some: {
          jabatan: {
            contains: userData.jabatan,
          },
        },
      },
    });
  }

  const users = await prisma.user.findMany({
    where: {
      role: 'USER',
      AND: filters,
      unit_kerja: {
        nama: {
          contains: userData.nama,
        },
      },
    },
    orderBy: {
      nama: 'asc',
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      status_kepegawaian: true,
      unit_kerja: {
        select: {
          nama: true,
        },
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
    take: size,
    skip,
  });

  const totalItems = await prisma.user.count({
    where: {
      role: 'USER',
      AND: filters,
    },
  });

  return {
    users,
    page: userData.page,
    total_item: totalItems,
    total_page: Math.ceil(totalItems / size),
  };
};

const findChart = async () => {
  const totalUsers = await prisma.user.count({
    where: {
      role: 'USER',
    },
  });
  const jumlahLakiLaki = await prisma.user.count({
    where: {
      role: 'USER',
      profile: {
        jenis_kelamin: 'Laki_Laki',
      },
    },
  });

  const jumlahPerempuan = await prisma.user.count({
    where: {
      role: 'USER',
      profile: {
        jenis_kelamin: 'Perempuan',
      },
    },
  });

  const ChartSD = await prisma.user.count({
    where: {
      unit_kerja: {
        nama: {
          startsWith: 'SD',
        },
      },
    },
  });
  const ChartSMP = await prisma.user.count({
    where: {
      unit_kerja: {
        nama: {
          startsWith: 'SMP',
        },
      },
    },
  });
  const CharTSMA = await prisma.user.count({
    where: {
      unit_kerja: {
        nama: {
          startsWith: 'SMA',
        },
      },
    },
  });

  const persentaseLakiLaki = (jumlahLakiLaki / totalUsers) * 100;
  const persentasePerempuan = (jumlahPerempuan / totalUsers) * 100;

  return {
    Jenis_Kelamin: {
      laki_laki: persentaseLakiLaki,
      perempuan: persentasePerempuan,
    },
    Unit_Kerja: {
      SD: ChartSD,
      SMP: ChartSMP,
      SMA: CharTSMA,
    },
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
      email: true,
      status_kepegawaian: true,
      unit_kerja: {
        select: {
          nama: true,
        },
      },
      profile: {
        select: {
          alamat: true,
          tempat_lahir: true,
          tanggal_lahir: true,
          jenis_kelamin: true,
          nomor_telepon: true,
          agama: true,
        },
      },
      titles: {
        select: {
          jabatan: true,
        },
        take: 1,
        orderBy: {
          tmt: 'desc',
        },
      },
    },
  });
  return user;
};
const findPasswordUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
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
      unit_kerja_id: userData.unit_kerja_id,
      img_url: userData.img_url,
      profile: {
        create: {
          user_id: userData.id,
        },
      },
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      email: true,
      status_kepegawaian: true,
      unit_kerja: {
        select: {
          nama: true,
        },
      },
      img_url: true,
      profile: {
        select: {
          user_id: true,
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

const editUserByAdmin = async (id, userData) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      nama: userData.nama,
      nip: userData.nip,
      status_kepegawaian: userData.status_kepegawaian,
      unit_kerja_id: userData.unit_kerja_id,
      // password: userData.password,
    },
    select: {
      id: true,
      nama: true,
      nip: true,
      status_kepegawaian: true,
      unit_kerja: {
        select: {
          nama: true,
        },
      },
    },
  });
  return user;
};

const editPasswordUser = async (id, userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashPassword,
    },
  });
  return user;
};

export {
  findAllUsers,
  findUserById,
  findUserByNIP,
  findUserCurrent,
  findPasswordUser,
  findChart,
  insertUser,
  updateTokenUserByNIP,
  deleteToken,
  deleteUser,
  editUser,
  userDashboard,
  editUserByAdmin,
  editPasswordUser,
};
