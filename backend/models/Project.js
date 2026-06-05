const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  titel: String,
  beschrijving: String,
  afbeelding: String,
  tags: [String],
  githubUrl: String,
  liveUrl: String
});

module.exports = mongoose.model('Project', ProjectSchema);
