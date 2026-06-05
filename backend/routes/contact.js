const express = require('express');
const router = express.Router();

// POST contact formulier (extra API voor database)
router.post('/', async (req, res) => {
  try {
    const { naam, email, bericht } = req.body;
    
    // Validatie
    if (!naam || !email || !bericht) {
      return res.status(400).json({ 
        success: false, 
        message: 'Alle velden zijn verplicht' 
      });
    }
    
    // Hier kun je het bericht opslaan in database of email sturen
    console.log(`📧 Nieuw contactbericht van ${naam} (${email}): ${bericht}`);
    
    res.json({ 
      success: true, 
      message: 'Bericht succesvol verzonden!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Fout bij verzenden bericht' 
    });
  }
});

module.exports = router;