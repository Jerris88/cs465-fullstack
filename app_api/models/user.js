const mongoose = require('mongoose');
const crypto = require('crypto'); // Built-in Node module
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Email serves as the login identifier
  email: { type: String, required: true, unique: true },

  // Passwords are stored as a hash and salt
  hash: String,
  salt: String
});

// Generates a salt and hash from a plain-text password
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

// Validates a login password against the stored hash
userSchema.methods.validPassword = function (password) {
  const hashCheck = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');

  return this.hash === hashCheck;
};

// Creates a JWT for authenticated access
userSchema.methods.generateJWT = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // Token expires in 7 days

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: Math.floor(expiry.getTime() / 1000)
    },
    process.env.JWT_SECRET
  );
};

mongoose.model('User', userSchema);