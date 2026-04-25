const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  sessionDuration: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  depositPaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  tattooDescription: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
