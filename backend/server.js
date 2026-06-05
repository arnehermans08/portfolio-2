const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Models
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connectie
mongoose.connect('mongodb://mongodb:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log('✅ MongoDB verbonden!'));

// ========== API ROUTES ==========

// Test endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hallo vanaf de backend!' });
});

// GET alle skills
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        console.log(`📊 ${skills.length} skills opgehaald`);
        res.json(skills);
    } catch (error) {
        console.error('Fout:', error);
        res.status(500).json({ message: 'Fout bij ophalen skills' });
    }
});

// GET alle projecten
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        console.log(`📁 ${projects.length} projecten opgehaald`);
        res.json(projects);
    } catch (error) {
        console.error('Fout:', error);
        res.status(500).json({ message: 'Fout bij ophalen projecten' });
    }
});

// POST contact
app.post('/api/contact', async (req, res) => {
    try {
        const { naam, email, bericht } = req.body;
        console.log(`📧 Contact: ${naam} (${email}): ${bericht}`);
        res.json({ success: true, message: 'Bericht ontvangen!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij verzenden' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('🚀 Server op poort 5000');
});