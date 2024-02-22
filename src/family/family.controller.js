import express from 'express';
import {
  createFamily,
  deleteFamilyById,
  getAllFamilies,
  updateFamily,
} from './family.service.js';

const router = express.Router();

router.get('/families', async (req, res, next) => {
  try {
    const { id } = req.user;
    const families = await getAllFamilies(id);

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
      data: family,
      message: 'Family created successfully',
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
      message: 'Family deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
