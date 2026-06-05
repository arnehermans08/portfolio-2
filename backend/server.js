const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importeer routes
const skillsRoutes = require('./routes/skills');
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connectie
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB verbonden!'))
  .catch(err => console.error('❌ MongoDB fout:', err));

// Routes
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server draait!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server draait op poort ${PORT}`);
});
