const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      default: 'Untitled Trip',
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;