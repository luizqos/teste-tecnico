import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function InitialRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/profile" replace />;
}
