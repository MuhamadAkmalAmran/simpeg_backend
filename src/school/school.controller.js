import express from 'express';
import {
  createSchool,
  deleteSchoolById,
  getAllSchools,
  updateSchool,
} from './school.service.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

router.get('/schools', adminMiddleware, async (req, res, next) => {
  try {
    const schoolData = {
      nama: req.query.nama,
      page: req.query.page,
    };
    const schools = await getAllSchools(schoolData);
    res.status(200).json(schools);
  } catch (error) {
    next(error);
  }
});

router.post('/schools', async (req, res, next) => {
  try {
    const schoolData = req.body;
    const school = await createSchool(schoolData);
    res.status(201).json({
      error: false,
      message: 'Schools created',
      data: school,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/schools/:id', async (req, res, next) => {
  try {
    const schoolId = req.params.id;
    const schoolData = req.body;
    const school = await updateSchool(schoolId, schoolData);
    res.status(200).json({
      error: false,
      message: 'Schools updated',
      data: school,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/schools/:id', async (req, res, next) => {
  try {
    const schoolId = req.params.id;
    await deleteSchoolById(schoolId);
    res.status(200).json({
      error: false,
      message: 'School Deleted',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
