// app_api/routes/index.js
const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Route to return all trips
router.get('/trips', tripsController.tripsList);

// Route to return a single trip by code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;