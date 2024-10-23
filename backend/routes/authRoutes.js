const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign up
router.post('/signup', authController.signup);

// Sign in
router.post('/signin', authController.signin);

// Forgot PIN - send OTP
router.post('/forgot-pin', authController.forgotPin);

// Reset PIN
router.post('/reset-pin', authController.resetPin);

module.exports = router;
