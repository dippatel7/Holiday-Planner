const express = require('express');
const { getTrips, addTrip, updateTrip, deleteTrip } = require('../controllers/tripController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes (authentication)

// Get all trips for the logged-in user (R005: View Trips)
router.get('/', protect, getTrips); // The 'protect' middleware ensures the user is authenticated

// Create a new trip (R004: Create Trip)
router.post('/', protect, addTrip);

// Update an existing trip by its ID (R006: Update Trip)
router.put('/:id', protect, updateTrip);

// Delete a trip by its ID (R007: Delete Trip)
router.delete('/:id', protect, deleteTrip);

module.exports = router;
