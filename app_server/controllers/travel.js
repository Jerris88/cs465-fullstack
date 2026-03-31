// app_server/controllers/travel.js

// Load the filesystem module to read JSON data
var fs = require('fs');

// Read the trips.json file and turn it into usable JavaScript data
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travelList = (req, res) => {

  // Pass JSON trip data to the view so it can dynamically render the list
  res.render('travel', {
    title: 'Travlr Getaways – Travel',
    active_travel: true,
    trips: trips   
  });
};

module.exports = {
  travelList
};