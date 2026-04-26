const Booking = require('../models/Booking');
require('../models/Client');
require('../models/Artist');

// GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('clientId', 'name email phone')
      .populate('artistId', 'name speciality hourlyRate');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/bookings
const createBooking = async (req, res) => {
  const { clientId, artistId, date, sessionDuration, depositPaid, status, tattooDescription } = req.body;

  if (!clientId || !artistId || !date || !sessionDuration || !tattooDescription) {
    return res.status(400).json({ error: 'clientId, artistId, date, sessionDuration and tattooDescription are required' });
  }

  if (sessionDuration < 1 || sessionDuration > 8) {
    return res.status(400).json({ error: 'sessionDuration must be between 1 and 8 hours' });
  }

  try {
    const booking = await Booking.create({ clientId, artistId, date, sessionDuration, depositPaid, status, tattooDescription });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/bookings/:id
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllBookings, createBooking, updateBooking, deleteBooking };
