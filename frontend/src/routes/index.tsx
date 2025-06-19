import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Unauthorized from '../pages/Unauthorized';
import NotFound from '../pages/NotFound';
import Users from '../pages/Users';

import { PrivateRoute } from '../components/PrivateRoute';
import InitialRedirect from './InitialRedirect';

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rota raiz dinâmica */}
        <Route path="/" element={<InitialRedirect />} />

        {/* Rotas protegidas */}
        <Route
          path="/users"
          element={
            <PrivateRoute roles={['admin']}>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={['admin']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
