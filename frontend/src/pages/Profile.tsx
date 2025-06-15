import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Container,
  Card,
  Title,
  Subtitle,
  InfoContainer,
  InfoItem,
  Label,
  Value,
  ButtonContainer,
  Button,
  Input,
  SectionTitle,
} from '../components/styles/Profile.styles';
import { formatDate } from '../utils/formatDate';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.patch('/auth/profile', {
        id: user?.id,
        name,
        password: password !== '' ? password : undefined,
      });
      alert('Dados atualizados com sucesso!');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Perfil</Title>
        <Subtitle>Gerencie suas informações</Subtitle>

        <SectionTitle>Informações</SectionTitle>
        <InfoContainer>
          <InfoItem>
            <Label>Nome:</Label>
            <Value>{user?.name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Email:</Label>
            <Value>{user?.email}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Permissão:</Label>
            <Value>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Criado em:</Label>
            <Value>{user && user.createdAt ? formatDate(user.createdAt) : '-'}</Value>
          </InfoItem>
        </InfoContainer>

        <SectionTitle>Atualizar Dados</SectionTitle>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Novo nome"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nova senha (opcional)"
          type="password"
        />

        <ButtonContainer>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
          <Button onClick={handleLogout} style={{ backgroundColor: '#ef4444' }}>
            Sair
          </Button>
        </ButtonContainer>
      </Card>
    </Container>
  );
}
