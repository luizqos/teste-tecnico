/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
}

interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  iat: number;
  exp: number;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentUser: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        createdAt: decoded.createdAt
      };
      setUser(currentUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  async function login(email: string, password: string) {
    try {
      const { data } = await api.post('/auth/login', { email, password });

      const token = data.access_token;
      const decoded = jwtDecode<JwtPayload>(token);
      const currentUser: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        createdAt: decoded.createdAt
      };
      
      localStorage.setItem('token', token);
      setUser(currentUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (decoded.role === 'admin') {
        navigate('/users');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      console.error('Erro no login', err);
      alert('Email ou senha inválidos');
    }
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
