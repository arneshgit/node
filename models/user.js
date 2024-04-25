const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }, // Admin status, default to false
  loggedIn: { type: Boolean, default: false }, // Logged in status, default to false
  resetOTP : String,
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
