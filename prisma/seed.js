import bcrypt from 'bcrypt';
import prisma from '../src/config/database.js';

async function main() {
  const encryptedPassword = await bcrypt.hash('12345678', 10);
  const alice = await prisma.user.create({
    data: {
      nama: 'Admin PDM Sleman',
      nip: '123456789123456',
      status_kepegawaian: 'tetap',
      password: encryptedPassword,
      role: 'ADMIN',
    },
  });
  console.log(alice);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
