import { deleteFamily, editFamily, findAllFamilies, findFamilyById, insertFamily } from './family.repository.js'

const getAllFamilies = async () => {
  const families = await findAllFamilies();

  return families;
}

const createFamily = async (familyData) => {
  if (!familyData.nik || !familyData.nama || !familyData.tempat || !familyData.tanggal_lahir || !familyData.jenis_kelamin || !familyData.agama || !familyData.hubungan_kel) {
    throw new Error('Fields are required.');
  }

  const family = await insertFamily(familyData);

  return family;
}

const updateFamily = async (id, familyData) => {
  const familyById = await findFamilyById(id);

  if (!familyById) {
    throw new Error('Family not found.');
  }

  const family = await editFamily(id, familyData);

  return family;
}

const deleteFamilyById = async (id) => {
  const family = await deleteFamily(id);

  return family;
}

export { getAllFamilies, createFamily, updateFamily, deleteFamilyById };