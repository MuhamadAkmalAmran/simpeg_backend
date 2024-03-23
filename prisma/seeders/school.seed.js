import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';

const generateSchools = () => {
  const schools = [];
  for (let i = 0; i < 20; i++) {
    const school = {
      npsn: faker.string.numeric(8),
      nama: `${faker.helpers.arrayElement(['SD', 'SMP', 'SMA'])} 
          ${faker.string.numeric({ length: { min: 1, max: 3 } })} Muhammadiyah Sleman`,
      jenjang: faker.helpers.arrayElement(['SD', 'SMP', 'SMA']),
      alamat: faker.location.street(),
    };
    schools.push(school);
  }
  return schools;
};

const seedSchools = async () => {
  const schools = generateSchools();
  schools.forEach(async (school) => {
    try {
      await prisma.school.create({
        data: school,
      });
      console.log(`school "${school.nama}" berhasil ditambahkan.`);
    } catch (error) {
      console.error(`Gagal menambahkan school: ${error.message}`);
    }
  });
};

export default seedSchools;
