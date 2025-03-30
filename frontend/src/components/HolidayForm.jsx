import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const HolidayForm = ({ holidays, setHolidays, editingHoliday, setEditingHoliday }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    if (editingHoliday) {
      setFormData({
        title: editingHoliday.title,
        description: editingHoliday.description,
        date: editingHoliday.date,
      });
    } else {
      setFormData({ title: '', description: '', date: '' });
    }
  }, [editingHoliday]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingHoliday) {
        const response = await axiosInstance.put(`/api/holidays/${editingHoliday._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setHolidays(holidays.map((holiday) => (holiday._id === response.data._id ? response.data : holiday)));
      } else {
        const response = await axiosInstance.post('/api/holidays', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setHolidays([...holidays, response.data]);
      }
      setEditingHoliday(null);
      setFormData({ title: '', description: '', date: '' });
    } catch (error) {
      alert('Failed to save holiday.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingHoliday ? 'Edit Holiday' : 'Add Holiday'}</h1>
      <input
        type="text"
        placeholder="Holiday Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        {editingHoliday ? 'Update Holiday' : 'Add Holiday'}
      </button>
    </form>
  );
};

export default HolidayForm;
