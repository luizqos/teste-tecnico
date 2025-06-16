import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AccordionHeader, BackButton, ChartContainer, Container, Filters, Section, Table } from '../components/styles/Dashbord.styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatDate } from '../utils/formatDate';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string | null;
  status?: boolean;
}
export default function DashboardUserAnalysis() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [daysWithoutLogin, setDaysWithoutLogin] = useState<number>(30);
  const [showNeverLoggedIn, setShowNeverLoggedIn] = useState<boolean>(true);
  const [showWithoutLoginDays, setShowWithoutLoginDays] = useState<boolean>(true);


  useEffect(() => {
    api.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erro ao carregar usuários', error));
  }, []);

  const usersNeverLoggedIn = users.filter(u => !u.lastLogin);

  const usersWithoutLoginDays = users.filter(u => {
    if (!u.lastLogin) return false;
    const lastLoginDate = new Date(u.lastLogin);
    const now = new Date();
    const daysDifference = Math.floor(
      (now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysWithoutLogin === 91
      ? daysDifference > 90
      : daysDifference >= daysWithoutLogin;
  });

  const chartData = [
    { name: 'Nunca Logaram', count: usersNeverLoggedIn.length },
    { name: `Sem login há +${daysWithoutLogin}${daysWithoutLogin === 91 ? '+' : ''} dias`, count: usersWithoutLoginDays.length },
    { name: 'Total', count: users.length },
  ];

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>

      <Filters>
        <label>Filtrar por dias sem login:</label>
        <select
          value={daysWithoutLogin}
          onChange={(e) => setDaysWithoutLogin(Number(e.target.value))}
        >
          <option value={30}>30 dias</option>
          <option value={60}>60 dias</option>
          <option value={90}>90 dias</option>
        </select>
      </Filters>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#1e90ff" strokeWidth={3} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <Section>
        <AccordionHeader onClick={() => setShowNeverLoggedIn(!showNeverLoggedIn)}>
          <h2>Usuários que Nunca Fizeram Login</h2>
          <span>{showNeverLoggedIn ? '▲' : '▼'}</span>
        </AccordionHeader>

        {showNeverLoggedIn && (
          usersNeverLoggedIn.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                </tr>
              </thead>
              <tbody>
                {usersNeverLoggedIn.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        )}
      </Section>

      <Section>
        <AccordionHeader onClick={() => setShowWithoutLoginDays(!showWithoutLoginDays)}>
          <h2>Usuários sem login há mais de {daysWithoutLogin >= 91 ? '90' : daysWithoutLogin} dias</h2>
          <span>{showWithoutLoginDays ? '▲' : '▼'}</span>
        </AccordionHeader>

        {showWithoutLoginDays && (
          usersWithoutLoginDays.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Último Login</th>
                </tr>
              </thead>
              <tbody>
                {usersWithoutLoginDays.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</td>
                    <td>{user.lastLogin ? formatDate(user.lastLogin) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        )}
      </Section>
    </Container>
  );
}
