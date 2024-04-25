// routes/threads.js
const express = require('express');
const router = express.Router();
const Thread = require('../models/thread');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
// Route to create a new thread
router.post('/create', async (req, res) => {
  const { title, content, username } = req.body;

  try {
    const newThread = await Thread.create({ title, content, username });
    res.status(201).json(newThread);
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
