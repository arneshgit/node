const mongoose = require('mongoose');

// MongoDB connection URI
const dbURI = 'mongodb://127.0.0.1:27017/forum';

// Connect to MongoDB
mongoose.connect(dbURI);

// Get the default connection
const db = mongoose.connection;

// Event handlers for database connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Export the database connection
module.exports = db;
