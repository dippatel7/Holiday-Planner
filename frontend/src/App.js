import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Plans from './pages/Plans';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto py-4 px-2">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/holidays" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/holidays" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/holidays" /> : <Register />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/holidays" element={user ? <Plans /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
