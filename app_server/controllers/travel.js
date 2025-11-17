// app_server/controllers/travel.js

const travelList = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways – Travel',
    active_travel: true
  });
};

module.exports = {
  travelList
};