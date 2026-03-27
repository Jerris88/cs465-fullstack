// app_server/controllers/rooms.js

const rooms = (req, res) => {
    res.render('rooms', {
      title: 'Travlr Getaways – Rooms'
    });
  };
  
  module.exports = {
    rooms
  };