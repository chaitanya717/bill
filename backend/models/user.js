const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true, match: /^\d{10}$/ },
  pin: { type: String, required: true }, // This will be hashed
  otp: { type: String },
  otpExpiry: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
