const mongoose = require('mongoose');

// Define the holiday schema
const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Trim whitespace
    },
    destination: {
      type: String,
      required: true,
      trim: true, // Trim whitespace
    },
    startDate: {
      type: Date,
      required: true, // Holiday start date
    },
    endDate: {
      type: Date,
      required: true, // Holiday end date
    },
    description: {
      type: String,
      required: true,
      trim: true, // Trim whitespace
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Holiday model based on the schema
const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;
