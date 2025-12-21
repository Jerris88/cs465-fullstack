const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');
const { expressjwt } = require('express-jwt');

// JWT middleware for secured admin routes
const auth = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

// Public trip routes (read-only)
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindOne);

// Authentication routes
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Admin trip routes (secured)
router.post('/trips', auth, tripsController.tripsCreate);
router.put('/trips/:tripCode', auth, tripsController.tripsUpdateOne);
router.delete('/trips/:tripCode', auth, tripsController.tripsDeleteOne);

module.exports = router;