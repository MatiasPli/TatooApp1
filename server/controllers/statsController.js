const Booking = require('../models/Booking');

const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingCount = await Booking.countDocuments({ status: 'pending' });
    const confirmedCount = await Booking.countDocuments({ status: 'confirmed' });
    const completedCount = await Booking.countDocuments({ status: 'completed' });
    const cancelledCount = await Booking.countDocuments({ status: 'cancelled' });

    const avgResult = await Booking.aggregate([
      { $group: { _id: null, avgSessionDuration: { $avg: '$sessionDuration' } } },
    ]);

    res.json({
      totalBookings,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      avgSessionDuration: avgResult[0]?.avgSessionDuration.toFixed(1) || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBookingStats };
