const express = require('express');
const { getTrips, addTrip, updateTrip, deleteTrip } = require('../controllers/tripController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTrips);
router.post('/', protect, addTrip);
router.put('/:id', protect, updateTrip);
router.delete('/:id', protect, deleteTrip);

module.exports = router;