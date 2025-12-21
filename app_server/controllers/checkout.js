// app_server/controllers/checkout.js

const checkoutGet = (req, res) => {
  res.render('checkout', {
    title: 'Checkout',
    email: req.session.user.email
  });
};

module.exports = {
  checkoutGet
};