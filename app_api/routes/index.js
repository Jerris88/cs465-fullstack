const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Trips routes
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindOne);
router.post('/trips', tripsController.tripsCreate);
router.put('/trips/:tripCode', tripsController.tripsUpdateOne);
router.delete('/trips/:tripCode', tripsController.tripsDeleteOne);

module.exports = router;