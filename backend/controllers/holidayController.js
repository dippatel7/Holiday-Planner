const Holiday = require('../models/Holiday');

const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find({ userId: req.user.id });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addHoliday = async (req, res) => {
  const { name, date, description } = req.body;
  try {
    const holiday = new Holiday({
      userId: req.user.id,
      name,
      date,
      description
    });
    await holiday.save();
    res.status(201).json(holiday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHoliday = async (req, res) => {
  const { name, date, description } = req.body;
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });

    holiday.name = name || holiday.name;
    holiday.date = date || holiday.date;
    holiday.description = description || holiday.description;

    await holiday.save();
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });

    await holiday.deleteOne();
    res.json({ message: 'Holiday deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHolidays, addHoliday, updateHoliday, deleteHoliday }; 