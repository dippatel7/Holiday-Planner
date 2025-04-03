const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false, // Made optional to allow default in controller
      trim: true, // Trim whitespace
      default: 'Untitled Trip', // Default value if not provided
    },
    destination: {
      type: String,
      required: true,
      trim: true, // Trim whitespace
    },
    startDate: {
      type: Date,
      required: true, // Trip start date
    },
    endDate: {
      type: Date,
      required: true, // Trip end date
    },
    description: {
      type: String,
      required: false, // Made optional for flexibility
      trim: true, // Trim whitespace
      default: '', // Default to empty string if not provided
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Trip model based on the schema
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
