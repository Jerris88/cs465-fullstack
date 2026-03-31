// app_server/routes/index.js

const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlTravel = require('../controllers/travel');
const ctrlNews = require('../controllers/news');

router.get('/', ctrlMain.index);
router.get('/travel', ctrlTravel.travelList);
router.get('/news', ctrlNews.news);

module.exports = router;