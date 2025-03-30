const Holiday = require('../models/Holiday');

// Get Holidays (Read)
const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find({ userId: req.user.id });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Holiday (Create)
const addHoliday = async (req, res) => {
  const { name, destination, startDate, endDate, description } = req.body;
  try {
    const holiday = new Holiday({
      userId: req.user.id, // Associate holiday with the current logged-in user
      name,
      destination,
      startDate,
      endDate,
      description,
    });
    await holiday.save();
    res.status(201).json(holiday); // Respond with the created holiday
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Holiday (Update)
const updateHoliday = async (req, res) => {
  const { name, destination, startDate, endDate, description } = req.body;
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    
    holiday.name = name || holiday.name;
    holiday.destination = destination || holiday.destination;
    holiday.startDate = startDate || holiday.startDate;
    holiday.endDate = endDate || holiday.endDate;
    holiday.description = description || holiday.description;
    
    await holiday.save();
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Holiday (Delete)
const deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    
    await holiday.remove();
    res.json({ message: 'Holiday deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHolidays, addHoliday, updateHoliday, deleteHoliday };
