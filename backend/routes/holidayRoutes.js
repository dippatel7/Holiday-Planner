const express = require('express');
const { getHolidays, addHoliday, updateHoliday, deleteHoliday } = require('../controllers/holidayController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getHolidays);
router.post('/', protect, addHoliday);
router.put('/:id', protect, updateHoliday);
router.delete('/:id', protect, deleteHoliday);

module.exports = router; 