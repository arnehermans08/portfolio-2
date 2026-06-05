let mongoose = require('mongoose');

let ProjectSchema = new mongoose.Schema({
  titel: String,
  beschrijving: String,
  afbeelding: String,
  tags: [String]
});

module.exports = mongoose.model('Project', ProjectSchema);
