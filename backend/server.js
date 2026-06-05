let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

// Models
let Skill = require('./models/Skill');
let Project = require('./models/Project');

// Contact model (toegevoegd)
let ContactSchema = new mongoose.Schema({
    naam: String,
    email: String,
    bericht: String,
    datum: { type: Date, default: Date.now }
});
let Contact = mongoose.model('Contact', ContactSchema);

let app = express();
app.use(cors());
app.use(express.json());

// MongoDB connectie
mongoose.connect('mongodb://mongodb:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;
db.once('open', () => console.log(' MongoDB verbonden!'));

// ========== API ROUTES ==========

// Test endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hallo vanaf de backend!' });
});

// GET alle skills
app.get('/api/skills', async (req, res) => {
    try {
        let skills = await Skill.find();
        console.log(` ${skills.length} skills opgehaald`);
        res.json(skills);
    } catch (error) {
        console.error('Fout:', error);
        res.status(500).json({ message: 'Fout bij ophalen skills' });
    }
});

// GET alle projecten
app.get('/api/projects', async (req, res) => {
    try {
        let projects = await Project.find();
        console.log(` ${projects.length} projecten opgehaald`);
        res.json(projects);
    } catch (error) {
        console.error('Fout:', error);
        res.status(500).json({ message: 'Fout bij ophalen projecten' });
    }
});

// POST contact - OPSLAAN IN DATABASE
app.post('/api/contact', async (req, res) => {
    try {
        let { naam, email, bericht } = req.body;
        console.log(` Contact ontvangen: ${naam} (${email})`);
        
        //  Opslaan in database
        let nieuwBericht = new Contact({ naam, email, bericht });
        await nieuwBericht.save();
        
        console.log(` Opgeslagen in database! ID: ${nieuwBericht._id}`);
        res.json({ success: true, message: 'Bericht ontvangen en opgeslagen!' });
        
    } catch (error) {
        console.error('Fout:', error);
        res.status(500).json({ success: false, message: 'Fout bij verzenden' });
    }
});

// Start server
app.listen(5000, () => {
    console.log(' Server op poort 5000');
});