import express from 'express';
import {
  createFamily,
  deleteFamilyById,
  getAllFamilies,
  getAllFamiliesByUser,
  updateFamily,
  verifFamily,
} from './family.service.js';
import { adminMiddleware } from '../middleware/authentication.middleware.js';

const router = express.Router();

// admin role
router.get('/admin/families/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const families = await getAllFamilies(id);
    res.status(200).json({
      status: false,
      families,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/admin/families/:userId/:id', adminMiddleware, async (req, res, next) => {
  try {
    // const { role } = req.user;
    const id = req.params.userId;
    const familyById = req.params.id;
    const familyData = req.body;
    const family = await verifFamily(familyById, familyData, id);
    res.status(200).json({
      error: false,
      message: 'Verified Success',
      data: family,
    });
  } catch (error) {
    next(error);
  }
});

// user role
router.get('/families', async (req, res, next) => {
  try {
    const { id } = req.user;
    const families = await getAllFamiliesByUser(id);

    res.status(200).json({
      status: false,
      families,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/families', async (req, res, next) => {
  try {
    const { id } = req.user;
    const familyData = req.body;
    const family = await createFamily(familyData, id);
    res.status(201).json({
      error: false,
      message: 'Family created successfully',
      data: family,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/families/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const familyId = req.params.id;
    const familyData = req.body;

    const family = await updateFamily(familyId, familyData, id);
    res.status(200).json({
      status: false,
      message: 'Family updated successfully',
      data: family,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/families/:id', async (req, res, next) => {
  try {
    const { id } = req.user;
    const familyId = req.params.id;
    await deleteFamilyById(familyId, id);

    res.status(200).json({
      error: false,
      message: 'Family deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
