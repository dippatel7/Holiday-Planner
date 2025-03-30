import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import HolidayForm from '../components/TaskForm';
import HolidayList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Holidays = () => {
  const { user } = useAuth();
  const [holidays, setHolidays] = useState([]);
  const [editingHoliday, setEditingHoliday] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axiosInstance.get('/api/holidays', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setHolidays(response.data);
      } catch (error) {
        alert('Failed to fetch holidays.');
      }
    };

    fetchHolidays();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <HolidayForm
        holidays={holidays}
        setHolidays={setHolidays}
        editingHoliday={editingHoliday}
        setEditingHoliday={setEditingHoliday}
      />
      <HolidayList
        holidays={holidays}
        setHolidays={setHolidays}
        setEditingHoliday={setEditingHoliday}
      />
    </div>
  );
};

export default Holidays;
