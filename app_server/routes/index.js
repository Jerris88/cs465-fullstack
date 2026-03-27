// app_server/routes/index.js

const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');
const ctrlRooms = require('../controllers/rooms');
const ctrlNews = require('../controllers/news');
const ctrlMeals = require('../controllers/meals');
const ctrlContact = require('../controllers/contact');
const ctrlAbout = require('../controllers/about');

router.get('/', ctrlMain.index);
router.get('/travel', ctrlTravel.travelList);
router.get('/rooms', ctrlRooms.rooms);
router.get('/news', ctrlNews.news);
router.get('/meals', ctrlMeals.meals);
router.get('/contact', ctrlContact.contact);
router.get('/about', ctrlAbout.about);

module.exports = router;