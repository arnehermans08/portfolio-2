const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// GET alle skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen skills', error });
  }
});

module.exports = router;
