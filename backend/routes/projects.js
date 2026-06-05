const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET alle projecten
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen projecten', error });
  }
});

module.exports = router;
