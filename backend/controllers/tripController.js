const Trip = require('../models/Trip');

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTrip = async (req, res) => {
  const { name, destination, startDate, endDate, description } = req.body;
  try {
    const trip = new Trip({
      userId: req.user.id,
      name,
      destination,
      startDate,
      endDate,
      description,
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTrip = async (req, res) => {
  const { name, destination, startDate, endDate, description } = req.body;
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    trip.name = name || trip.name;
    trip.destination = destination || trip.destination;
    trip.startDate = startDate || trip.startDate;
    trip.endDate = endDate || trip.endDate;
    trip.description = description || trip.description;

    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    await trip.deleteOne();
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrips, addTrip, updateTrip, deleteTrip };