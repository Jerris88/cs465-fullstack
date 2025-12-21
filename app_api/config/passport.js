const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Local strategy uses email + password
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username }).exec();

      // No matching account
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      // Password check failed
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Login success
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));