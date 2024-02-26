import prisma from '../db/database.js';

const findAllDocumentsByUser = async (userId) => {
  const documents = await prisma.document.findMany({
    where: {
      user_id: userId,
    },
  });

  return documents;
};

const insertDocument = async (documentData, userId) => {
  const document = await prisma.document.create({
    data: {
      jenis_dokumen: documentData.jenis_dokumen,
      no_dokumen: documentData.no_dokumen,
      file_url: documentData.file_url,
      user_id: userId,
    },
  });

  return document;
};

const findDocumentById = async (id, userId) => {
  const document = await prisma.document.findUnique({
    where: {
      id,
      user_id: userId,
    },
  });
  return document;
};

const editDocument = async (id, documentData, userId) => {
  const document = await prisma.document.update({
    where: {
      id,
      user_id: userId,
    },
    data: {
      jenis_dokumen: documentData.jenis_dokumen,
      no_dokumen: documentData.no_dokumen,
      file_url: documentData.file_url,
    },
  });
  return document;
};

const deleteDocument = async (id, userId) => {
  const document = await prisma.document.delete({
    where: {
      id,
      user_id: userId,
    },
  });
  return document;
};

export {
  findAllDocumentsByUser,
  insertDocument,
  findDocumentById,
  editDocument,
  deleteDocument,
};
