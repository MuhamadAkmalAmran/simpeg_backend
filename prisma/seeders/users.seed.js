import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import prisma from '../../src/config/database.js';

const generateUsers = (schools) => {
  // const schoolId = seedSchools.map((s) => s.id).id;
  const encryptedPassword = bcrypt.hashSync('12345678', 10);
  const users = [];
  const school = faker.helpers.arrayElement(schools);
  for (let i = 0; i < 30; i++) {
    const user = {
      nama: faker.person.fullName(),
      nip: faker.string.numeric(18),
      status_kepegawaian: faker.helpers.arrayElement(['Tetap', 'Kontrak']),
      unit_kerja_id: school.id, // Sesuaikan dengan jumlah sekolah yang telah dibuat
      password: encryptedPassword,
    };
    users.push(user);
  }
  const alice = {
    nama: 'Admin PDM Sleman',
    nip: '123456789012345676',
    status_kepegawaian: 'Tetap',
    unit_kerja_id: school.id,
    role: 'ADMIN',
    password: encryptedPassword,
  };
  console.log(alice);
  users.push(alice);
  return users;
};

const seedUsers = async () => {
  const schools = await prisma.school.findMany();
  const users = generateUsers(schools);
  users.forEach(async (user) => {
    try {
      await prisma.user.create({
        data: user,
      });

      console.log(`User "${user.nama}" berhasil ditambahkan.`);
    } catch (error) {
      console.error(`Gagal menambahkan user: ${error.message}`);
    }
  });
};

export default seedUsers;
