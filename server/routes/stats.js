const express = require('express');
const router = express.Router();
const { getBookingStats } = require('../controllers/statsController');

router.get('/bookings', getBookingStats);

module.exports = router;
