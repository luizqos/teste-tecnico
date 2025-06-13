import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Card } from '../components/styles/Register.styles';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar.');
    }
  };

  return (
    <Wrapper>
      <Card>
        <h2>Cadastro</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button onClick={handleRegister}>Cadastrar</button>
      </Card>
    </Wrapper>
  );
}
