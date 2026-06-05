let express = require('express');
let router = express.Router();
let Project = require('../models/Project');

// GET alle projecten
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen projecten', error });
  }
});

module.exports = router;// ← Geeft de router vrij
