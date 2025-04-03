import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Trips from './pages/Trips'; // Renamed from Plans for clarity
import Destinations from './pages/Destinations';
import Share from './pages/Share';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        <Routes>
          {/* Home: Redirects based on auth state */}
          <Route path="/" element={user ? <Navigate to="/trips" /> : <Navigate to="/login" />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={user ? <Navigate to="/trips" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/trips" /> : <Register />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/trips" element={user ? <Trips /> : <Navigate to="/login" />} />
          <Route path="/destinations" element={user ? <Destinations /> : <Navigate to="/login" />} />
          <Route path="/share" element={user ? <Share /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
