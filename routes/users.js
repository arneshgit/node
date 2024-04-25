const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Parse incoming request bodies with JSON payloads
router.use(bodyParser.urlencoded({ extended: true }));

// POST route for registering a new user
router.post('/register', async (req, res) => {
  try {
    // Create a new user instance
    const newUser = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      admin: false,
      loggedIn: false
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log('User inserted successfully:', savedUser);
    res.status(200).json({ message: 'User registered successfully' , success : 'True'});
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route for requesting password reset
async function generateOTP() {
  try {
    // Generate a random six-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
}
async function sendPasswordResetEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arnesh656@gmail.com', // Your Gmail email address
        pass: 'kxbf qvsd qgpp lddc' // Your Gmail password or application-specific password
      }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'arnesh656@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Password Reset OTP', // Subject line
      text: `Your OTP for password reset is: ${otp}` // plain text body
    });

    console.log('Password reset OTP sent to:', email);
  } catch (error) {
    console.error('Error sending password reset OTP:', error);
  }
}
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a six-digit OTP
    const otp = await generateOTP();

    // Save the OTP to the user document
    user.resetOTP = otp; // Assuming you have a field named 'resetOTP' in your user schema
    await user.save();

    // Send password reset OTP
    await sendPasswordResetEmail(user.email, otp);

    res.status(200).json({ message: 'Password reset OTP sent.' });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to verify OTP and reset password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches
    if (user.resetOTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update user's password
    user.password = newPassword;
    // Clear the reset OTP
    user.resetOTP = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
