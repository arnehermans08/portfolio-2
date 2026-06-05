let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Simpel schema voor contact berichten
let ContactSchema = new mongoose.Schema({
    naam: String,
    email: String,
    bericht: String,
    datum: { type: Date, default: Date.now }
});

let Contact = mongoose.model('Contact', ContactSchema);

// POST - opslaan in database
router.post('/', async (req, res) => {
    try {
        let { naam, email, bericht } = req.body;
        
        // Opslaan
        let nieuwBericht = new Contact({ naam, email, bericht });
        await nieuwBericht.save();
        
        console.log(`💾 Opgeslagen: ${naam} - ${email}`);
        
        res.json({ success: true, message: 'Bericht verzonden!' });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout' });
    }
});

module.exports = router;