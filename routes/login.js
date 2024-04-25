const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');

// Parse incoming request bodies with JSON payloads
router.use(bodyParser.urlencoded({ extended: true }));

// POST route for handling login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username and password
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If user is found, return success message or token
    res.json({ message: 'Login successful', success: 'True' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
