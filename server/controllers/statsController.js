const Booking = require('../models/Booking');

const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const depositResult = await Booking.aggregate([
      { $match: { depositPaid: true } },
      {
        $lookup: {
          from: 'artists',
          localField: 'artistId',
          foreignField: '_id',
          as: 'artist',
        },
      },
      { $unwind: '$artist' },
      {
        $group: {
          _id: null,
          totalDepositsCollected: { $sum: { $multiply: ['$artist.hourlyRate', 0.2] } },
        },
      },
    ]);

    const avgResult = await Booking.aggregate([
      { $group: { _id: null, avgSessionDuration: { $avg: '$sessionDuration' } } },
    ]);

    res.json({
      totalBookings,
      totalDepositsCollected: depositResult[0]?.totalDepositsCollected.toFixed(2) || 0,
      avgSessionDuration: avgResult[0]?.avgSessionDuration.toFixed(1) || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBookingStats };
