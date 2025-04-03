const Trip = require('../models/Trip'); // Renamed model to Trip for consistency

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
    // Validate required fields
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ message: 'Destination, startDate, and endDate are required' });
    }
    const trip = new Trip({
      userId: req.user.id, // Associate with the current logged-in user
      name: name || 'Untitled Trip', // Default name if not provided
      destination,
      startDate,
      endDate,
      description: description || '', // Optional field with default
    });
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip); // Respond with the created trip
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
    // Authorization check
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
    // Authorization check
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this trip' });
    }
    await Trip.deleteOne({ _id: req.params.id }); // Updated to deleteOne
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error: error.message });
  }
};

module.exports = { getTrips, addTrip, updateTrip, deleteTrip };
