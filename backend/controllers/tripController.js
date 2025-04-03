const Trip = require('../models/Trip');
const nodemailer = require('nodemailer'); // For email sharing

// Configure Nodemailer (replace with your email service credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: use Gmail; adjust for your provider
  auth: {
    user: process.env.EMAIL_USER, // Add to .env
    pass: process.env.EMAIL_PASS, // Add to .env
  },
});

// Get all trips for the logged-in user (R005: View Trips)
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

// Add a new trip (R004: Create Trip)
const addTrip = async (req, res) => {
  const { name, destination, startDate, endDate, description } = req.body;
  try {
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ message: 'Destination, startDate, and endDate are required' });
    }
    const trip = new Trip({
      userId: req.user.id,
      name: name || 'Untitled Trip',
      destination,
      startDate,
      endDate,
      description: description || '',
    });
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error: error.message });
  }
};

// Update an existing trip (R006: Update Trip)
const updateTrip = async (req, res) => {
  const { name, destination, startDate, endDate, description } = req.body;
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this trip' });
    }
    trip.name = name || trip.name;
    trip.destination = destination || trip.destination;
    trip.startDate = startDate || trip.startDate;
    trip.endDate = endDate || trip.endDate;
    trip.description = description || trip.description;
    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error: error.message });
  }
};

// Delete a trip (R007: Delete Trip)
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this trip' });
    }
    await Trip.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error: error.message });
  }
};

// Share a trip via email (R011: Share Itinerary via Email)
const shareTrip = async (req, res) => {
  const { tripId, email } = req.body;
  try {
    if (!tripId || !email) {
      return res.status(400).json({ message: 'Trip ID and email are required' });
    }
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to share this trip' });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Holiday Planner: Your Trip to ${trip.destination}`,
      text: `
        Hi there,
        Here’s a trip itinerary shared with you:
        - Destination: ${trip.destination}
        - Dates: ${new Date(trip.startDate).toLocaleDateString()} to ${new Date(trip.endDate).toLocaleDateString()}
        - Description: ${trip.description || 'No description provided'}
        
        Plan your next adventure with Holiday Planner!
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Trip shared successfully via email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sharing trip', error: error.message });
  }
};

module.exports = { getTrips, addTrip, updateTrip, deleteTrip, shareTrip };
