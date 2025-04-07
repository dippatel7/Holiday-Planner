import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition duration-200">
        Holiday Planner
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/trips" className="text-lg hover:text-blue-200 hover:underline transition duration-200">
              My Trips
            </Link>
            <Link to="/profile" className="text-lg hover:text-blue-200 hover:underline transition duration-200">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 text-lg font-medium transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-lg hover:text-blue-200 hover:underline transition duration-200">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 text-lg font-medium transition duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;