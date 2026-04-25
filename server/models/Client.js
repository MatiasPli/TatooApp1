const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  skinNotes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
