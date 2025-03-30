import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const HolidayList = ({ holidays, setHolidays, setEditingHoliday }) => {
  const { user } = useAuth();

  const handleDelete = async (holidayId) => {
    try {
      await axiosInstance.delete(`/api/holidays/${holidayId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setHolidays(holidays.filter((holiday) => holiday._id !== holidayId));
    } catch (error) {
      alert('Failed to delete holiday.');
    }
  };

  return (
    <div>
      {holidays.map((holiday) => (
        <div key={holiday._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{holiday.title}</h2>
          <p>{holiday.description}</p>
          <p className="text-sm text-gray-500">Date: {new Date(holiday.date).toLocaleDateString()}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingHoliday(holiday)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(holiday._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
