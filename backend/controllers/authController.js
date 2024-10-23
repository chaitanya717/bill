const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpUtils = require('../utils/otpUtils');
const nodemailer = require('nodemailer');

// Sign Up
exports.signup = async (req, res) => {
  const { username, mobileNumber, pin } = req.body;
  console.log(username, mobileNumber, pin);
  

  try {
    const hashedPin = await bcrypt.hash(pin, 10);

    const user = new User({
      username,
      mobileNumber,
      pin: hashedPin
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'User already exists or invalid data' });
  }
};

// Sign In
// Sign In
exports.signin = async (req, res) => {
  const { mobileNumber, pin } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPin = await bcrypt.compare(pin, user.pin);
    if (!validPin) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Verify the token to get user details
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve the user details based on the token
    const userDetails = await User.findById(decodedToken.id).select('username mobileNumber _id'); // Exclude _id from the response

    // Return user details along with the token
    res.json({ user: userDetails });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Forgot PIN - Send OTP
exports.forgotPin = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = otpUtils.generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();
    // You can send the OTP via email/SMS here
    res.json({ message: `OTP sent to ${mobileNumber}` });
  } catch (err) {
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// Reset PIN
exports.resetPin = async (req, res) => {
  const { mobileNumber, otp, newPin } = req.body;

  try {
    const user = await User.findOne({ mobileNumber, otp });
    if (!user || user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired or invalid' });

    const hashedPin = await bcrypt.hash(newPin, 10);
    user.pin = hashedPin;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    res.json({ message: 'PIN reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting PIN' });
  }
};
