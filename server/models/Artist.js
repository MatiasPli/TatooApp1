const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
