// app_server/controllers/main.js

const index = (req, res) => {
    res.render('index', {
      title: 'Travlr Getaways',
      active_home: true
    });
  };
  
  module.exports = {
    index
  };