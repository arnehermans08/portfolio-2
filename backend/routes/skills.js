let express = require('express');
let router = express.Router();
let Skill = require('../models/Skill');

// GET alle skills
router.get('/', async (req, res) => {
  try {
    let skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen skills', error });
  }
});

module.exports = router;// ← Geeft de router vrij
