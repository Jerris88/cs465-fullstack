const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    console.error('Error fetching trips', err);
    res.status(500).json({ message: 'Error fetching trips', error: err });
  }
};

// GET /api/trips/:tripCode
const tripsFindOne = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.error('Error finding trip', err);
    res.status(500).json({ message: 'Error finding trip', error: err });
  }
};

// POST /api/trips
const tripsCreate = async (req, res) => {
  try {
    const tripData = {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    };

    const newTrip = await Trip.create(tripData);
    res.status(201).json(newTrip);
  } catch (err) {
    console.error('Error creating trip', err);
    res.status(400).json({ message: 'Error creating trip', error: err });
  }
};

// PUT /api/trips/:tripCode
const tripsUpdateOne = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.code = req.body.code || trip.code;
    trip.name = req.body.name || trip.name;
    trip.length = req.body.length || trip.length;
    trip.start = req.body.start || trip.start;
    trip.resort = req.body.resort || trip.resort;
    trip.perPerson = req.body.perPerson || trip.perPerson;
    trip.image = req.body.image || trip.image;
    trip.description = req.body.description || trip.description;

    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (err) {
    console.error('Error updating trip', err);
    res.status(400).json({ message: 'Error updating trip', error: err });
  }
};

// DELETE /api/trips/:tripCode
const tripsDeleteOne = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(204).json(null);
  } catch (err) {
    console.error('Error deleting trip', err);
    res.status(500).json({ message: 'Error deleting trip', error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindOne,
  tripsCreate,
  tripsUpdateOne,
  tripsDeleteOne
};