const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');
const ctrlNews = require('../controllers/news');
const ctrlAuth = require('../controllers/auth');
const ctrlReservations = require('../controllers/reservations');
const ctrlCheckout = require('../controllers/checkout');

// Home + public pages
router.get('/', ctrlMain.index);
router.get('/travel', ctrlTravel.travelList);
router.get('/news', ctrlNews.news);

// Customer auth pages
router.get('/login', ctrlAuth.loginGet);
router.post('/login', ctrlAuth.loginPost);
router.get('/signup', ctrlAuth.signupGet);
router.post('/signup', ctrlAuth.signupPost);
router.get('/forgot-password', ctrlAuth.forgotPasswordGet);
router.get('/logout', ctrlAuth.logout);

// Wireframe placeholder pages
router.get('/terms', ctrlAuth.termsGet);
router.get('/privacy', ctrlAuth.privacyGet);
router.get('/learn-more', ctrlAuth.learnMoreGet);

// Logged-in only page (wireframe requirement)
router.get(
  '/reservations',
  ctrlAuth.requireLogin,
  ctrlReservations.reservations
);

router.get(
  '/checkout',
  ctrlAuth.requireLogin,
  ctrlCheckout.checkoutGet
);

module.exports = router;