// app_server/controllers/reservations.js

const reservations = (req, res) => {
  res.render('reservations', {
    title: 'Reservations',
    email: req.session.user.email
  });
};

module.exports = {
  reservations
};