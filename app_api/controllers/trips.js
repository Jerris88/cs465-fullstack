const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips  → list all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips || !Array.isArray(trips) || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }

    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error fetching trips list:', err);
    return res.status(500).json({ message: 'Error fetching trips list', error: err });
  }
};

// GET /api/trips/:tripCode  → get one trip by code
const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip with code ${tripCode} not found` });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Error fetching trip by code:', err);
    return res.status(500).json({ message: 'Error fetching trip by code', error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};