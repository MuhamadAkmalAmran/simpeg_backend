import express from 'express';
import { createFamily, deleteFamilyById, getAllFamilies, updateFamily } from './family.service.js';

const router = express.Router();

router.get('/families', async (req, res) => {
  const families = await getAllFamilies();

  res.status(200).json(families);
});

router.post('/families', async (req, res) => {
  try {
    const familyData = req.body;
    const family = await createFamily(familyData);
  
    res.status(201).json({
      data: family,
      message: 'Family created successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  };
});

router.patch('/families/:id', async (req, res) => {
  try {
    const familyId = req.params.id;
    const familyData = req.body;

    const family = await updateFamily(parseInt(familyId), familyData);
    res.status(200).json({
      data: family,
      message: 'Family updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  };
});

router.delete('/families/:id', async (req, res) => {
  try {
    const familyId = req.params.id;
    const Family = await deleteFamilyById(parseInt(familyId));

    res.status(200).json({
      message: 'Family deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

export default router;