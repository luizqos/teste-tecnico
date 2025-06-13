import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {user && <Route path="/profile" element={<Profile />} />}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
