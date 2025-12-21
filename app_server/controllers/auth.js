const mongoose = require('mongoose');
const User = mongoose.model('User');

// Shows the customer login screen
const loginGet = (req, res) => {
  res.render('login', { title: 'Login' });
};

// Handles customer login (DB-backed session login)
const loginPost = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render('login', {
      title: 'Login',
      error: 'Login failed. Check email and password.'
    });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).exec();

    if (!user || !user.validPassword(password)) {
      return res.status(400).render('login', {
        title: 'Login',
        error: 'Login failed. Check email and password.'
      });
    }

    req.session.user = { email: user.email };

    // If login was triggered by a protected page, return there
    if (req.session.returnTo) {
      const redirectTo = req.session.returnTo;
      delete req.session.returnTo;
      return res.redirect(redirectTo);
    }

    // Otherwise go to home after voluntary login
    return res.redirect('/');
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).render('login', {
      title: 'Login',
      error: 'Server error during login.'
    });
  }
};

// Shows the customer sign up screen
const signupGet = (req, res) => {
  res.render('signup', { title: 'Sign Up' });
};

// Handles customer sign up (DB-backed session login)
const signupPost = async (req, res) => {
  const { name, email, password, password2, agree } = req.body;

  if (!name || !email || !password || !password2 || password !== password2 || !agree) {
    return res.status(400).render('signup', {
      title: 'Sign Up',
      error: 'Sign up failed. Check your entries and try again.'
    });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() }).exec();

    if (existingUser) {
      return res.status(400).render('signup', {
        title: 'Sign Up',
        error: 'An account with that email already exists.'
      });
    }

    const user = new User({
      name,
      email: email.toLowerCase()
    });

    user.setPassword(password);
    await user.save();

    req.session.user = { email: user.email };

    // If signup was triggered by a protected page, return there
    if (req.session.returnTo) {
      const redirectTo = req.session.returnTo;
      delete req.session.returnTo;
      return res.redirect(redirectTo);
    }

    // Otherwise send new users to Reservations (wireframe "logged-in area")
    return res.redirect('/reservations');
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).render('signup', {
      title: 'Sign Up',
      error: 'Server error creating account.'
    });
  }
};

// Forgot password placeholder
const forgotPasswordGet = (req, res) => {
  res.render('forgot-password', { title: 'Forgot Password' });
};

// Terms / Privacy / Learn More placeholders
const termsGet = (req, res) => {
  res.render('terms', { title: 'Terms of Use' });
};

const privacyGet = (req, res) => {
  res.render('privacy', { title: 'Privacy Policy' });
};

const learnMoreGet = (req, res) => {
  res.render('learn-more', { title: 'Learn More' });
};

// Logs out and clears session
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// Middleware to protect logged-in only pages
const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  req.session.returnTo = req.originalUrl;
  return res.redirect('/login');
};

module.exports = {
  loginGet,
  loginPost,
  signupGet,
  signupPost,
  forgotPasswordGet,
  termsGet,
  privacyGet,
  learnMoreGet,
  logout,
  requireLogin
};