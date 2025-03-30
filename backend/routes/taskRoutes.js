const express = require('express');
const { getHolidays, addHoliday, updateHoliday, deleteHoliday } = require('../controllers/holidayController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');  // Middleware to protect routes (authentication)

// Get all holidays for the logged-in user
router.get('/', protect, getHolidays); // The 'protect' middleware will ensure the user is authenticated

// Create a new holiday
router.post('/', protect, addHoliday);

// Update an existing holiday by its ID
router.put('/:id', protect, updateHoliday);

// Delete a holiday by its ID
router.delete('/:id', protect, deleteHoliday);

module.exports = router;
