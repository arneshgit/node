
// models/Thread.js
const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: String,
  createdAt: { type: Date }
});
// Pre-save hook to set createdAt field to current time in IST before saving the document
threadSchema.pre('save', function(next) {
    // Get the current date and time in UTC
    const utcDate = new Date();
    
    // Convert UTC time to IST by adding 5 hours and 30 minutes
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    
    // Set the createdAt field to the IST date
    this.createdAt = istDate;
    
    next();
  });
module.exports = mongoose.model('Thread', threadSchema);
